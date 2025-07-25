import { Tabs } from "@mantine/core";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { requireAuth } from "~/server/auth.server";
import { serviceClient } from "~/services/axios";
import { asyncRunSafe } from "~/utils/other";
import LeaveRequestApplicationTab from "./_tab/LrApplicationTab";
import LeaveRequestPendingTab from "./_tab/LrPendingTab";
import { localizePathServer } from "~/server/utils.server";
import { AxiosError } from "axios";

enum TabKeys {
  leaveApplication = "Leave Application",
  pendingApplication = "Pending Application",
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { roles, accessToken, id } = await requireAuth(request);

  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("pageNumber") ?? "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") ?? "10", 10);
  const skip = (page - 1) * pageSize;

  let approvedFilter = `Status eq 'Approved'`;
  let pendingFilter = `Status eq 'Pending'`;

  if (roles.includes("Employee")) {
    approvedFilter += ` and UserID eq ${id}`;
    pendingFilter += ` and UserID eq ${id}`;
  }

  const [error, result] = await asyncRunSafe(
    Promise.all([
      serviceClient.get(
        `/LeaveRequest?$filter=${encodeURIComponent(
          approvedFilter
        )}&$top=${pageSize}&$skip=${skip}&$count=true`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      serviceClient.get(
        `/LeaveRequest?$filter=${encodeURIComponent(
          pendingFilter
        )}&$top=${pageSize}&$skip=${skip}&$count=true`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      serviceClient.get(`/LeaveRequest/${id}/remaining-days`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ])
  );

  const [lrAppRes, lrPendingRes, remainDayRes] = result ?? [];
  const lrAppCount = lrAppRes?.data["@odata.count"] ?? 0;
  const lrPendingCount = lrPendingRes?.data["@odata.count"] ?? 0;

  if (error) {
    console.error(error);
    throw new Error("Failed to load data");
  }

  return {
    roles,
    accessToken,
    lrApp: lrAppRes?.data,
    lrAppMeta: {
      PageNumber: page,
      PageSize: pageSize,
      TotalPages: Math.ceil(lrAppCount / pageSize),
      TotalCount: lrAppCount,
    },
    lrPending: lrPendingRes?.data,
    lrPendingMeta: {
      PageNumber: page,
      PageSize: pageSize,
      TotalPages: Math.ceil(lrPendingCount / pageSize),
      TotalCount: lrPendingCount,
    },
    remainDay: remainDayRes?.data,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const { id, accessToken } = await requireAuth(request);
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const UserId = Number(formData.get("id"));

  if (actionType === "approve") {
    const [error] = await asyncRunSafe(
      serviceClient.put(`/LeaveRequest/${UserId}/approve`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    );
    if (error) {
      return json({ success: false, message: `${error}` }, { status: 400 });
    }

    return redirect(localizePathServer("/leave"));
  }

  if (actionType === "create") {
    const payload = {
      LeaveType: formData.get("LeaveType"),
      StartDate: new Date(formData.get("StartDate") as string).toISOString(),
      EndDate: new Date(formData.get("EndDate") as string).toISOString(),
      Reason: formData.get("Reason"),
    };
    const [error, result] = await asyncRunSafe(
      serviceClient.post(`/LeaveRequest/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    );
    if (error) {
      return json(
        { success: false, message: `${error?.response?.data}` },
        { status: 400 }
      );
    }

    return json({
      success: true,
      message: "Successfully",
      LeaveRequestID: result?.data?.LeaveRequestID,
    });
  }

  return json({ success: false, message: "Unknown action" }, { status: 400 });
}

export default function Leave() {
  const { roles, lrApp, lrAppMeta, lrPending, lrPendingMeta, remainDay } =
    useLoaderData<typeof loader>();
  const isHr = roles?.includes("HR");
  const [activeTab, setActiveTab] = useState<TabKeys | string | null>(
    TabKeys.leaveApplication
  );

  return (
    <div className="p-4">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value={TabKeys.leaveApplication}>
            Leave Application
          </Tabs.Tab>
          <Tabs.Tab value={TabKeys.pendingApplication}>
            Pending Application
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TabKeys.leaveApplication}>
          <LeaveRequestApplicationTab
            lrApp={lrApp}
            remainDay={remainDay}
            meta={lrAppMeta}
          />
        </Tabs.Panel>
        <Tabs.Panel value={TabKeys.pendingApplication}>
          <LeaveRequestPendingTab
            lrPending={lrPending}
            meta={lrPendingMeta}
            isValid={isHr}
          />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

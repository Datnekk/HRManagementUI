import { Tabs } from "@mantine/core";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { requireAuth } from "~/server/auth.server";
import { serviceClient } from "~/services/axios";
import { asyncRunSafe } from "~/utils/other";
import AttendanceTab from "./_tab/AttendanceTab";
import { notifyError } from "~/utils/notif";

enum TabKeys {
  attendance = "Attendance",
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { id } = await requireAuth(request);
  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("pageNumber") ?? "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") ?? "10", 10);

  const skip = (page - 1) * pageSize;

  const [error, result] = await asyncRunSafe(
    Promise.all([
      serviceClient.get(
        `/Attendance?$filter=UserID eq ${id}&$top=${pageSize}&$skip=${skip}&$count=true`
      ),
    ])
  );

  const [attendanceRes] = result ?? [];
  const attendanceCount = attendanceRes?.data["@odata.count"] ?? 0;

  if (error) {
    console.error(error);
    notifyError("Failed to load data");
  }

  return {
    id,
    attendances: attendanceRes?.data ?? [],
    attendanceMeta: {
      PageNumber: page,
      PageSize: pageSize,
      TotalPages: Math.ceil(attendanceCount / pageSize),
      TotalCount: attendanceCount,
    },
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const { id, accessToken } = await requireAuth(request);
  const formData = await request.formData();
  const actionType = formData.get("actionType");

  try {
    if (actionType === "check-in") {
      const [error] = await asyncRunSafe(
        serviceClient.post(`/Attendance/${id}/check-in`, null, {
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
      return json({ success: true, message: `Suceesfully` });
    } else if (actionType === "check-out") {
      const [error] = await asyncRunSafe(
        serviceClient.post(`/Attendance/${id}/check-out`, null, {
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
      return json({ success: true, message: `Suceesfully` });
    }
  } catch (error) {
    return json(
      { success: false, message: "Operation failed" },
      { status: 500 }
    );
  }
}

export default function Attendance() {
  const { attendances, attendanceMeta } = useLoaderData<typeof loader>();

  const [activeTab, setActiveTab] = useState<TabKeys | string | null>(
    TabKeys.attendance
  );

  return (
    <div className="p-4">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value={TabKeys.attendance}>Attendance</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TabKeys.attendance}>
          <AttendanceTab attendances={attendances} meta={attendanceMeta} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

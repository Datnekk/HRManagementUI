import { Tabs } from "@mantine/core";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { requireAuth } from "~/server/auth.server";
import { serviceClient } from "~/services/axios";
import { asyncRunSafe } from "~/utils/other";
import DepartmentTab from "./_tab/DepartmentTab";
import PositionTab from "./_tab/PositionsTab";

enum TabKeys {
  department = "department",
  regisnation = "regisnation",
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { accessToken } = await requireAuth(request);

  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("pageNumber") ?? "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") ?? "10", 10);

  const skip = (page - 1) * pageSize;

  const [error, result] = await asyncRunSafe(
    Promise.all([
      serviceClient.get(
        `/Department?$top=${pageSize}&$skip=${skip}&$count=true`
      ),
      serviceClient.get(`/Position?$top=${pageSize}&$skip=${skip}&$count=true`),
    ])
  );

  const [departmentsRes, positionsRes] = result ?? [];
  const departmentCount = departmentsRes?.data["@odata.count"] ?? 0;
  const positionCount = departmentsRes?.data["@odata.count"] ?? 0;

  if (error) {
    console.error(error);
    throw new Error("Failed to load data");
  }

  return {
    accessToken,
    departments: departmentsRes?.data,
    departmentMeta: {
      PageNumber: page,
      PageSize: pageSize,
      TotalPages: Math.ceil(departmentCount / pageSize),
      TotalCount: departmentCount,
    },
    positions: positionsRes?.data,
    positionMeta: {
      PageNumber: page,
      PageSize: pageSize,
      TotalPages: Math.ceil(positionCount / pageSize),
      TotalCount: departmentCount,
    },
  } as const;
}

export async function action({ request }: ActionFunctionArgs) {
  const { accessToken } = await requireAuth(request);
  const formData = await request.formData();
  const actionType = formData.get("actionType");

  if (actionType == "dep-create") {
    const payload = {
      DepartmentName: formData.get("DepartmentName"),
      Status: formData.get("Status"),
      Description: formData.get("Description"),
    };

    const [error] = await asyncRunSafe(
      serviceClient.post(`/Department`, payload, {
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
    });
  }

  if (actionType == "pos-create") {
    const payload = {
      PositionName: formData.get("PositionName"),
    };

    const [error] = await asyncRunSafe(
      serviceClient.post(`/Position`, payload, {
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
    });
  }

  if (actionType == "dep-edit") {
    const DepartmentID = formData.get("DepartmentID");
    const payload = {
      DepartmentName: formData.get("DepartmentName"),
      Status: formData.get("Status"),
      Description: formData.get("Description"),
    };

    const [error] = await asyncRunSafe(
      serviceClient.put(`/Department/${DepartmentID}`, payload, {
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
    });
  }

  if (actionType == "pos-edit") {
    const PositionID = formData.get("PositionID");
    const payload = {
      PositionName: formData.get("PositionName"),
    };

    const [error] = await asyncRunSafe(
      serviceClient.put(`/Position/${PositionID}`, payload, {
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
    });
  }

  if (actionType == "dep-delete") {
    const DepartmentID = formData.get("DepartmentID");

    const [error] = await asyncRunSafe(
      serviceClient.delete(`/Department/${DepartmentID}`, {
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
    });
  }

  if (actionType == "pos-delete") {
    const PositionID = formData.get("PositionID");
    const [error] = await asyncRunSafe(
      serviceClient.delete(`/Position/${PositionID}`, {
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
    });
  }
}

export default function Organization() {
  const { departments, departmentMeta, positions, positionMeta } =
    useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState<TabKeys | string | null>(
    TabKeys.department
  );
  return (
    <div className="p-4">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value={TabKeys.department}>Department</Tabs.Tab>
          <Tabs.Tab value={TabKeys.regisnation}>Regisnation</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TabKeys.department}>
          <DepartmentTab department={departments} meta={departmentMeta} />
        </Tabs.Panel>
        <Tabs.Panel value={TabKeys.regisnation}>
          <PositionTab position={positions} meta={positionMeta} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

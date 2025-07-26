import { Tabs } from "@mantine/core";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { serviceClient } from "~/services/axios";
import { asyncRunSafe } from "~/utils/other";
import EmployeeTab from "./_tab/EmployeesTab";
import { LoginResponse } from "~/types/type";
import { requireAuth } from "~/server/auth.server";

enum TabKeys {
  employees = "Employees",
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { accessToken, roles } = await requireAuth(request);
  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("pageNumber") ?? "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") ?? "10", 10);

  const skip = (page - 1) * pageSize;

  const [error, result] = await asyncRunSafe(
    Promise.all([
      serviceClient.get(
        `/User?$filter=RoleIds/any(r: r eq 3)&$top=${pageSize}&$skip=${skip}&$count=true`
      ),
      serviceClient.get(`/Department`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      serviceClient.get(`/EmployeeLevel`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      serviceClient.get(`/ContractType`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      serviceClient.get(`/Position`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ])
  );

  const [userRes, depRes, empLvRes, ctRes, posRes] = result ?? [];
  const userCount = userRes?.data["@odata.count"] ?? 0;

  if (error) {
    console.error(error);
    throw new Error("Failed to load data");
  }

  return {
    accessToken,
    roles,
    users: userRes?.data ?? [],
    userMeta: {
      PageNumber: page,
      PageSize: pageSize,
      TotalPages: Math.ceil(userCount / pageSize),
      TotalCount: userCount,
    },
    deps: depRes?.data,
    empLv: empLvRes?.data,
    ct: ctRes?.data,
    pos: posRes?.data,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const { accessToken } = await requireAuth(request);
  const formData = await request.formData();
  const actionType = formData.get("actionType");

  if (actionType === "createEmployee") {
    const payload = {
      FirstName: formData.get("FirstName"),
      LastName: formData.get("LastName"),
      Email: formData.get("Email"),
      UserName: formData.get("UserName"),
      Password: formData.get("Password"),
    };

    const [error, result] = await asyncRunSafe(
      serviceClient.post<LoginResponse>("/Auth/register", payload)
    );

    if (result) {
      const errorData = error?.response?.data as LoginResponse;

      if (errorData?.ErrorMessage) {
        return json({
          success: false,
          message: errorData.ErrorMessage,
        });
      }

      const responseData: LoginResponse = result?.data;

      if (!responseData.IsAuthSuccessful) {
        return json({
          success: false,
          message: responseData.ErrorMessage || "Registration failed",
        });
      }

      return json({
        success: true,
        message: "User created successfully",
        Id: responseData.Id,
      });
    }

    return json({
      success: true,
      message: "Successfully",
    });
  }

  if (actionType === "createSalary") {
    const salaryPayload = {
      UserID: Number(formData.get("UserID")),
      BaseSalary: Number(formData.get("BaseSalary")),
      Allowances: Number(formData.get("Allowances")) || 0,
      Bonus: Number(formData.get("Bonus")) || 0,
      Deduction: Number(formData.get("Deduction")) || 0,
      SalaryPeriod: new Date(
        formData.get("SalaryPeriod") as string
      ).toISOString(),
    };
    console.log(salaryPayload);

    const [error] = await asyncRunSafe(
      serviceClient.post("/Salary", salaryPayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    );

    if (error) {
      console.log(error);
      return json({
        success: false,
        message: error?.response?.data || "Failed to create salary",
      });
    }

    return json({
      success: true,
      message: "Salary created successfully",
    });
  }

  if (actionType == "edit") {
    const UserID = Number(formData.get("UserID"));
    const payload = {
      DepartmentID: Number(formData.get("DepartmentID")),
      ContractTypeID: Number(formData.get("ContractTypeID")),
      EmployeeLevelID: Number(formData.get("EmployeeLevelID")),
      PositionID: Number(formData.get("PositionID")),
      Status: formData.get("Status"),
    };
    const [error] = await asyncRunSafe(
      serviceClient.put(`/User/${UserID}`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    );
    if (error) {
      console.log(error);
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
  return json({
    success: false,
    message: "Invalid action",
  });
}

export default function Employee() {
  const { roles, users, userMeta, deps, ct, empLv, pos } =
    useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState<TabKeys | string | null>(
    TabKeys.employees
  );
  const isAdmin = roles?.includes("Admin");

  return (
    <div className="p-4">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value={TabKeys.employees}>Employees</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TabKeys.employees}>
          <EmployeeTab
            users={users}
            meta={userMeta}
            deps={deps}
            ct={ct}
            empLv={empLv}
            pos={pos}
            isValid={isAdmin}
          />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

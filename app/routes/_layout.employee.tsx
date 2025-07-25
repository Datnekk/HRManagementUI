import { Tabs } from "@mantine/core";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { serviceClient } from "~/services/axios";
import { asyncRunSafe } from "~/utils/other";
import EmployeeTab from "./_tab/EmployeesTab";
import { LoginResponse } from "~/types/type";

enum TabKeys {
  employees = "Employees",
  create_account = "Create Account",
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("pageNumber") ?? "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") ?? "10", 10);

  const skip = (page - 1) * pageSize;

  const [error, result] = await asyncRunSafe(
    Promise.all([
      serviceClient.get(
        `/User?$filter=RoleIds/any(r: r eq 3)&$top=${pageSize}&$skip=${skip}&$count=true`
      ),
    ])
  );

  const [userRes] = result ?? [];
  const userCount = userRes?.data["@odata.count"] ?? 0;

  if (error) {
    console.error(error);
    throw new Error("Failed to load data");
  }

  return {
    users: userRes?.data ?? [],
    userMeta: {
      PageNumber: page,
      PageSize: pageSize,
      TotalPages: Math.ceil(userCount / pageSize),
      TotalCount: userCount,
    },
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const payload = {
    FirstName: formData.get("FirstName"),
    LastName: formData.get("LastName"),
    Email: formData.get("Email"),
    UserName: formData.get("UserName"),
    Password: formData.get("Password"),
  };

  const [error, response] = await asyncRunSafe(
    serviceClient.post<LoginResponse>("/Auth/register", payload)
  );

  if (error || response?.data?.IsAuthSuccessful === false) {
    return json<LoginResponse>({
      IsAuthSuccessful: false,
      ErrorMessage: response?.data?.ErrorMessage ?? "Registration failed",
      Id: 0,
      Email: "",
      Roles: [],
      AccessToken: "",
      RefreshToken: "",
    });
  }

  return redirect("/employee");
}

export default function Employee() {
  const { users, userMeta } = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState<TabKeys | string | null>(
    TabKeys.employees
  );

  return (
    <div className="p-4">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value={TabKeys.employees}>Employees</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TabKeys.employees}>
          <EmployeeTab users={users} meta={userMeta} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

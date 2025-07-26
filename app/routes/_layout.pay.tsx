import { Tabs } from "@mantine/core";
import { useState } from "react";
import PayRollTab from "./_tab/PayRollTab";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { requireAuth } from "~/server/auth.server";
import { serviceClient } from "~/services/axios";
import { asyncRunSafe } from "~/utils/other";
import { useLoaderData } from "@remix-run/react";
import PaySlipTab from "./_tab/PaySlipTab";

enum TabKeys {
  payRoll = "Payroll",
  genPaySlip = "Generate Payslip",
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { id, accessToken, roles } = await requireAuth(request);

  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("pageNumber") ?? "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") ?? "10", 10);

  const skip = (page - 1) * pageSize;
  const userFilter = roles?.includes("Employee")
    ? `&$filter=UserID eq ${id}`
    : "";

  const empFilter = roles?.includes("Employee") ? `?$filter=Id eq ${id}` : "";

  const [error, result] = await asyncRunSafe(
    Promise.all([
      serviceClient.get(
        `/Salary?$top=${pageSize}&$skip=${skip}&$count=true&${userFilter}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      serviceClient.get(
        `/Payslip?$top=${pageSize}&$skip=${skip}&$count=true&${userFilter}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      serviceClient.get(`/User${empFilter}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ])
  );

  const [salariesRes, paySlipRes, usersRes] = result ?? [];
  const salariesCount = salariesRes?.data["@odata.count"] ?? 0;
  const paySlipCount = salariesRes?.data["@odata.count"] ?? 0;

  if (error) {
    console.error(error);
    throw new Error("Failed to load data");
  }

  return {
    accessToken,
    roles,
    salaries: salariesRes?.data,
    salaryMeta: {
      PageNumber: page,
      PageSize: pageSize,
      TotalPages: Math.ceil(salariesCount / pageSize),
      TotalCount: salariesCount,
    },
    payslips: paySlipRes?.data,
    paySlipMeta: {
      PageNumber: page,
      PageSize: pageSize,
      TotalPages: Math.ceil(paySlipCount / pageSize),
      TotalCount: paySlipCount,
    },
    users: usersRes?.data,
  } as const;
}

export async function action({ request }: ActionFunctionArgs) {
  const { accessToken } = await requireAuth(request);
  const formData = await request.formData();
  const actionType = formData.get("actionType");

  if (actionType == "edit") {
    const SalaryID = formData.get("SalaryID");
    const payload = {
      UserID: Number(formData.get("UserID")),
      BaseSalary: Number(formData.get("BaseSalary")),
      Allowances: Number(formData.get("Allowances")) || 0,
      Bonus: Number(formData.get("Bonus")) || 0,
      Deduction: Number(formData.get("Deduction")) || 0,
      SalaryPeriod: new Date(
        formData.get("SalaryPeriod") as string
      ).toISOString(),
    };
    const [error] = await asyncRunSafe(
      serviceClient.put(`/Salary/${SalaryID}`, payload, {
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

  if (actionType == "delete") {
    const SalaryID = formData.get("SalaryID");
    const [error] = await asyncRunSafe(
      serviceClient.delete(`/Salary/${SalaryID}`, {
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

  if (actionType == "generate") {
    const payload = {
      UserID: Number(formData.get("UserID")),
      SalaryID: Number(formData.get("SalaryID")),
      IssueDate: new Date(formData.get("IssueDate") as string).toISOString(),
      Status: formData.get("Status"),
      RegeneratePdf: formData.get("RegeneratePdf") === "on",
    };

    const [error, response] = await asyncRunSafe(
      serviceClient.post("/PaySlip", payload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    );

    if (error) {
      console.log(error);
      return json(
        {
          success: false,
          message: error?.response?.data ?? "Failed to generate payslip",
        },
        { status: 400 }
      );
    }

    return json({
      success: true,
      message: "Successfully",
      data: response?.data,
    });
  }
}

export default function Pay() {
  const {
    accessToken,
    salaries,
    salaryMeta,
    payslips,
    paySlipMeta,
    roles,
    users,
  } = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState<TabKeys | string | null>(
    TabKeys.payRoll
  );
  const isHr = roles?.includes("HR");
  return (
    <div className="p-4">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value={TabKeys.payRoll}>Payroll</Tabs.Tab>
          <Tabs.Tab value={TabKeys.genPaySlip}>Generate Payslip</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TabKeys.payRoll}>
          <PayRollTab salaries={salaries} meta={salaryMeta} />
        </Tabs.Panel>
        <Tabs.Panel value={TabKeys.genPaySlip}>
          <PaySlipTab
            accessToken={accessToken}
            paySlips={payslips}
            meta={paySlipMeta}
            isValid={isHr}
            users={users}
          />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

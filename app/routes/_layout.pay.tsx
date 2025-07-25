import { Tabs } from "@mantine/core";
import { useState } from "react";
import PayRollTab from "./_tab/PayRollTab";
import { LoaderFunctionArgs } from "@remix-run/node";
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
  const { accessToken } = await requireAuth(request);

  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("pageNumber") ?? "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") ?? "10", 10);

  const skip = (page - 1) * pageSize;

  const [error, result] = await asyncRunSafe(
    Promise.all([
      serviceClient.get(`/Salary?$top=${pageSize}&$skip=${skip}&$count=true`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      serviceClient.get(`/Payslip?$top=${pageSize}&$skip=${skip}&$count=true`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ])
  );

  const [salariesRes, paySlipRes] = result ?? [];
  const salariesCount = salariesRes?.data["@odata.count"] ?? 0;
  const paySlipCount = salariesRes?.data["@odata.count"] ?? 0;

  if (error) {
    console.error(error);
    throw new Error("Failed to load data");
  }

  return {
    accessToken,
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
  } as const;
}

export default function Pay() {
  const { salaries, salaryMeta, payslips, paySlipMeta } =
    useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState<TabKeys | string | null>(
    TabKeys.payRoll
  );
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
          <PaySlipTab paySlips={payslips} meta={paySlipMeta} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

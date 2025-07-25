import { TableWithActions } from "~/components/TableWithActions";
import { MetaData, SalaryDTO } from "~/types/type";

export interface PayRollTabProps {
  salaries: SalaryDTO[];
  meta: MetaData;
}

export default function PayRollTab({ salaries, meta }: PayRollTabProps) {
  return (
    <TableWithActions<SalaryDTO>
      data={salaries}
      meta={meta}
      columns={[
        { label: "ID", key: "SalaryID" },
        { label: "Name", key: "UserName" },
        { label: "Base Salary", key: "BaseSalary" },
        { label: "Allowances", key: "Allowances" },
        { label: "Bonus", key: "Bonus" },
        { label: "Deduction", key: "Deduction" },
        { label: "Tax", key: "Tax" },
        { label: "NetSalary", key: "NetSalary" },
        { label: "SalaryPeriod", key: "SalaryPeriod" },
      ]}
      onEdit={(item) => {
        console.log("Edit department", item);
      }}
      onDelete={(item) => {
        console.log("Delete department", item);
      }}
    />
  );
}

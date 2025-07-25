import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { TableWithActions } from "~/components/TableWithActions";
import { MetaData, PayslipDTO } from "~/types/type";

export interface PaySlipTabProps {
  paySlips: PayslipDTO[];
  meta: MetaData;
}

export default function PaySlipTab({ paySlips, meta }: PaySlipTabProps) {
  return (
    <TableWithActions<PayslipDTO>
      data={paySlips}
      meta={meta}
      headerActions={
        <>
          <Button
            leftSection={<IconPlus size={16} />}
            // onClick={() => setModalOpen(true)}
          >
            Generate
          </Button>
        </>
      }
      columns={[
        { label: "Name", key: "UserName" },
        { label: "IssueDate", key: "IssueDate" },
        { label: "FilePath", key: "FilePath" },
        { label: "Status", key: "Status" },
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

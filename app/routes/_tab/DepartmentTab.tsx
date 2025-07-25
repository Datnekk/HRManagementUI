import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { TableWithActions } from "~/components/TableWithActions";
import { DepartmentDTO, MetaData } from "~/types/type";

export interface DepartmentTabProps {
  department: DepartmentDTO[];
  meta: MetaData;
}

export default function DepartmentTab({
  department,
  meta,
}: DepartmentTabProps) {
  return (
    <TableWithActions<DepartmentDTO>
      data={department}
      meta={meta}
      headerActions={
        <>
          <Button
            leftSection={<IconPlus size={16} />}
            // onClick={() => setModalOpen(true)}
          >
            Add
          </Button>
        </>
      }
      columns={[
        { label: "ID", key: "DepartmentID" },
        { label: "Name", key: "DepartmentName" },
        { label: "Status", key: "Status" },
        { label: "Description", key: "Description" },
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

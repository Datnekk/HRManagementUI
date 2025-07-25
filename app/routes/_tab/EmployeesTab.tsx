import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { EmployeeModal } from "~/components/EmployeeModal";
import { TableWithActions } from "~/components/TableWithActions";
import { MetaData, UserDTO } from "~/types/type";

export interface EmployeeTabProps {
  users: UserDTO[];
  meta: MetaData;
}

export default function EmployeeTab({ users, meta }: EmployeeTabProps) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <TableWithActions<UserDTO>
        data={users}
        meta={meta}
        headerActions={
          <>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={() => setModalOpen(true)}
            >
              Add
            </Button>
          </>
        }
        columns={[
          { label: "ID", key: "Id" },
          { label: "First Name", key: "FirstName" },
          { label: "Last Name", key: "LastName" },
          { label: "Date Of Birth", key: "DateOfBirth" },
          { label: "Email", key: "Email" },
          { label: "Status", key: "Status" },
        ]}
        onEdit={(item) => {
          console.log("Edit department", item);
        }}
        onDelete={(item) => {
          console.log("Delete department", item);
        }}
      />
      <EmployeeModal opened={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

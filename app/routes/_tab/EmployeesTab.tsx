import { Button, PasswordInput, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { AddModal } from "~/components/AddModal";
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
      <AddModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Account"
        submitLabel="Create"
        isSuccess={(data) => data?.IsAuthSuccessful === true}
        getError={(data) => data?.ErrorMessage ?? null}
      >
        <TextInput name="FirstName" label="First Name" required />
        <TextInput name="LastName" label="Last Name" required />
        <TextInput name="Email" label="Email" type="email" required />
        <TextInput name="UserName" label="Username" required />
        <PasswordInput name="Password" label="Password" required />
      </AddModal>
    </>
  );
}

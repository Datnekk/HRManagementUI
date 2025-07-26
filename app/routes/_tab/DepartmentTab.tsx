/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Select, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { AddModal } from "~/components/AddModal";
import { DeleteModal } from "~/components/DeleteModal";
import { EditModal } from "~/components/EditModal";
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
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<DepartmentDTO | null>(null);

  const handleAdd = () => setAddOpen(true);

  const handleEdit = (item: DepartmentDTO) => {
    setSelected(item);
    setEditOpen(true);
  };

  const handleDelete = (item: DepartmentDTO) => {
    setSelected(item);
    setDeleteOpen(true);
  };

  const isSuccess = (data: any) => data?.success === true;
  const getError = (data: any) =>
    data?.success === false ? data?.message : null;

  return (
    <>
      <TableWithActions<DepartmentDTO>
        data={department}
        meta={meta}
        headerActions={
          <Button leftSection={<IconPlus size={16} />} onClick={handleAdd}>
            Add
          </Button>
        }
        columns={[
          { label: "ID", key: "DepartmentID" },
          { label: "Name", key: "DepartmentName" },
          { label: "Status", key: "Status" },
          { label: "Description", key: "Description" },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add Modal */}
      <AddModal
        opened={addOpen}
        onClose={() => setAddOpen(false)}
        title="Create Department"
        submitLabel="Create"
        isSuccess={isSuccess}
        getError={getError}
      >
        <input type="hidden" name="actionType" value="dep-create" />
        <TextInput name="DepartmentName" label="Department Name" required />
        <Select
          name="Status"
          label="Status"
          data={[
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
            { value: "Pending", label: "Pending" },
          ]}
          required
        />
        <TextInput name="Description" label="Description" required />
      </AddModal>

      <EditModal
        opened={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Department"
        isSuccess={isSuccess}
        getError={getError}
      >
        <input type="hidden" name="actionType" value="dep-edit" />
        <input
          type="hidden"
          name="DepartmentID"
          value={selected?.DepartmentID ?? ""}
        />

        <TextInput
          name="DepartmentName"
          label="Department Name"
          defaultValue={selected?.DepartmentName ?? ""}
          required
        />
        <Select
          name="Status"
          label="Status"
          defaultValue={selected?.Status ?? "Active"}
          data={[
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
            { value: "Pending", label: "Pending" },
          ]}
          required
        />
        <TextInput
          name="Description"
          label="Description"
          defaultValue={selected?.Description ?? ""}
          required
        />
      </EditModal>

      <DeleteModal
        opened={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        hiddenFields={{
          actionType: "dep-delete",
          DepartmentID: selected?.DepartmentID ?? "",
        }}
        message={`Are you sure you want to delete "${selected?.DepartmentName}"?`}
        isSuccess={isSuccess}
        getError={getError}
      />
    </>
  );
}

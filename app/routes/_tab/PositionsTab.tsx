/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { AddModal } from "~/components/AddModal";
import { DeleteModal } from "~/components/DeleteModal";
import { EditModal } from "~/components/EditModal";
import { TableWithActions } from "~/components/TableWithActions";
import { MetaData, PositionDTO } from "~/types/type";

export interface PositionTabProps {
  position: PositionDTO[];
  meta: MetaData;
}

export default function PositionTab({ position, meta }: PositionTabProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<PositionDTO | null>(null);

  const handleAdd = () => setAddOpen(true);

  const handleEdit = (item: PositionDTO) => {
    setSelected(item);
    setEditOpen(true);
  };

  const handleDelete = (item: PositionDTO) => {
    setSelected(item);
    setDeleteOpen(true);
  };

  const isSuccess = (data: any) => data?.success === true;
  const getError = (data: any) =>
    data?.success === false ? data?.message : null;

  return (
    <>
      <TableWithActions<PositionDTO>
        data={position}
        meta={meta}
        headerActions={
          <>
            <Button leftSection={<IconPlus size={16} />} onClick={handleAdd}>
              Add
            </Button>
          </>
        }
        columns={[
          { label: "ID", key: "PositionID" },
          { label: "Name", key: "PositionName" },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddModal
        opened={addOpen}
        onClose={() => setAddOpen(false)}
        title="Create Department"
        submitLabel="Create"
        isSuccess={isSuccess}
        getError={getError}
      >
        <input type="hidden" name="actionType" value="pos-create" />
        <TextInput name="PositionName" label="Position Name" required />
      </AddModal>

      <EditModal
        opened={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Department"
        isSuccess={isSuccess}
        getError={getError}
      >
        <input type="hidden" name="actionType" value="pos-edit" />
        <input
          type="hidden"
          name="PositionID"
          value={selected?.PositionID ?? ""}
        />

        <TextInput
          name="PositionName"
          label="Position Name"
          defaultValue={selected?.PositionName ?? ""}
          required
        />
      </EditModal>

      <DeleteModal
        opened={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        hiddenFields={{
          actionType: "pos-delete",
          PositionID: selected?.PositionID ?? "",
        }}
        message={`Are you sure you want to delete "${selected?.PositionName}"?`}
        isSuccess={isSuccess}
        getError={getError}
      />
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useState } from "react";
import { DeleteModal } from "~/components/DeleteModal";
import { EditModal } from "~/components/EditModal";
import { TableWithActions } from "~/components/TableWithActions";
import { MetaData, SalaryDTO } from "~/types/type";

export interface PayRollTabProps {
  salaries: SalaryDTO[];
  meta: MetaData;
}

export default function PayRollTab({ salaries, meta }: PayRollTabProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<SalaryDTO | null>(null);

  const handleEdit = (item: SalaryDTO) => {
    setSelected(item);
    setEditOpen(true);
  };

  const handleDelete = (item: SalaryDTO) => {
    setSelected(item);
    setDeleteOpen(true);
  };

  const isSuccess = (data: any) => data?.success === true;
  const getError = (data: any) =>
    data?.success === false ? data?.message : null;
  return (
    <>
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
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EditModal
        opened={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Department"
        isSuccess={isSuccess}
        getError={getError}
      >
        <input type="hidden" name="actionType" value="edit" />

        <input type="hidden" name="SalaryID" value={selected?.SalaryID ?? ""} />
        <input type="hidden" name="UserID" value={selected?.UserID} />
        <TextInput
          name="BaseSalary"
          label="Base Salary"
          type="number"
          defaultValue={selected?.BaseSalary}
          required
        />
        <TextInput
          name="Allowances"
          label="Allowances"
          type="number"
          defaultValue={selected?.Allowances}
        />
        <TextInput
          name="Bonus"
          label="Bonus"
          type="number"
          defaultValue={selected?.Bonus}
        />
        <TextInput
          name="Deduction"
          label="Deduction"
          type="number"
          defaultValue={selected?.Deduction}
        />
        <DateTimePicker
          name="SalaryPeriod"
          label="Salary Period"
          defaultValue={selected?.SalaryPeriod}
          required
        />
      </EditModal>

      <DeleteModal
        opened={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        hiddenFields={{
          actionType: "delete",
          SalaryID: selected?.SalaryID ?? "",
        }}
        message={`Are you sure you want to delete this employee salary?`}
        isSuccess={isSuccess}
        getError={getError}
      />
    </>
  );
}

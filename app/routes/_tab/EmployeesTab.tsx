/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Select } from "@mantine/core";
import { IconPlus, IconStackPush } from "@tabler/icons-react";
import { useState } from "react";
import { EditModal } from "~/components/EditModal";
import { EmployeeModal } from "~/components/EmployeeModal";
import { TableWithActions } from "~/components/TableWithActions";
import {
  ContractTypeDTO,
  DepartmentDTO,
  EmployeeLevelDTO,
  MetaData,
  PositionDTO,
  UserDTO,
} from "~/types/type";

export interface EmployeeTabProps {
  users: UserDTO[];
  deps: DepartmentDTO[];
  ct: ContractTypeDTO[];
  empLv: EmployeeLevelDTO[];
  pos: PositionDTO[];
  meta: MetaData;
  isValid: boolean;
}

export default function EmployeeTab({
  users,
  meta,
  deps,
  ct,
  empLv,
  pos,
  isValid,
}: EmployeeTabProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = () => {
    setEditOpen(true);
  };

  const isSuccess = (data: any) => data?.success === true;
  const getError = (data: any) =>
    data?.success === false ? data?.message : null;
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
            {isValid && (
              <Button
                leftSection={<IconStackPush size={16} />}
                onClick={handleEdit}
              >
                Assign
              </Button>
            )}
          </>
        }
        columns={[
          { label: "ID", key: "Id" },
          { label: "First Name", key: "FirstName" },
          { label: "Last Name", key: "LastName" },
          { label: "Date Of Birth", key: "DateOfBirth" },
          { label: "Email", key: "Email" },
          { label: "Department", key: "DepartmentName" },
          { label: "EmployeeLevel", key: "EmployeeLevelName" },
          { label: "Contract Type", key: "ContractTypeName" },
          { label: "Position", key: "PositionName" },
          { label: "Status", key: "Status" },
        ]}
      />
      <EmployeeModal opened={modalOpen} onClose={() => setModalOpen(false)} />
      <EditModal
        opened={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Employee"
        isSuccess={isSuccess}
        getError={getError}
      >
        <input type="hidden" name="actionType" value="edit" />

        <Select
          label="User"
          name="UserID"
          data={users.map((u) => ({
            value: u.Id.toString(),
            label: `${u.FirstName} ${u.LastName}`,
          }))}
          placeholder="Select a user"
          required
        />

        <Select
          label="Department"
          name="DepartmentID"
          data={deps.map((d) => ({
            value: d.DepartmentID.toString(),
            label: d.DepartmentName,
          }))}
          placeholder="Select a department"
          required
        />

        <Select
          label="Contract Type"
          name="ContractTypeID"
          data={ct.map((c) => ({
            value: c.ContractTypeID.toString(),
            label: c.ContractTypeName,
          }))}
          placeholder="Select a contract type"
          required
        />

        <Select
          label="Employee Level"
          name="EmployeeLevelID"
          data={empLv.map((e) => ({
            value: e.EmployeeLevelID.toString(),
            label: e.EmployeeLevelName,
          }))}
          placeholder="Select employee level"
          required
        />

        <Select
          label="Position"
          name="PositionID"
          data={pos.map((p) => ({
            value: p.PositionID.toString(),
            label: p.PositionName,
          }))}
          placeholder="Select a position"
          required
        />
        <Select
          label="Status"
          name="Status"
          data={[
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
          ]}
          placeholder="Select status"
          required
        />
      </EditModal>
    </>
  );
}

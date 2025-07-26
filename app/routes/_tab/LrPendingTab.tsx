/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useFetcher } from "@remix-run/react";
import { IconCheck } from "@tabler/icons-react";
import React, { useState } from "react";
import { DeleteModal } from "~/components/DeleteModal";
import { EditModal } from "~/components/EditModal";
import { TableWithActions } from "~/components/TableWithActions";
import { LeaveRequestDTO, MetaData } from "~/types/type";
import { notifyError, notifySuccess } from "~/utils/notif";

export interface LeaveRequestPendingTabProps {
  lrPending: LeaveRequestDTO[];
  meta: MetaData;
  isValid: boolean;
}

type ActionResponse = {
  success: boolean;
  message: string;
};

export default function LeaveRequestPendingTab({
  lrPending,
  meta,
  isValid,
}: LeaveRequestPendingTabProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<LeaveRequestDTO | null>(null);
  const fetcher = useFetcher<ActionResponse>();

  function handleApprove(id: number) {
    fetcher.submit(
      { actionType: "approve", id: Number(id) },
      { method: "post" }
    );
  }

  const handleEdit = (item: LeaveRequestDTO) => {
    setSelected(item);
    setEditOpen(true);
  };

  const handleDelete = (item: LeaveRequestDTO) => {
    setSelected(item);
    setDeleteOpen(true);
  };

  const isSuccess = (data: any) => data?.success === true;
  const getError = (data: any) =>
    data?.success === false ? data?.message : null;

  React.useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        notifySuccess(fetcher.data.message);
      } else {
        notifyError(fetcher.data.message);
      }
    }
  }, [fetcher.data]);

  return (
    <>
      <TableWithActions<LeaveRequestDTO>
        data={lrPending}
        meta={meta}
        menuActions={(row) => (
          <>
            {isValid && (
              <>
                <Menu.Divider />

                <Menu.Item
                  leftSection={<IconCheck size={16} />}
                  onClick={() => handleApprove(row.LeaveRequestID)}
                >
                  Approve
                </Menu.Item>
              </>
            )}
          </>
        )}
        columns={[
          { label: "ID", key: "LeaveRequestID" },
          { label: "Employee Name", key: "UserName" },
          { label: "Start Date", key: "StartDate" },
          { label: "Leave Type", key: "LeaveType" },
          { label: "Reason", key: "Reason" },
          { label: "Status", key: "Status" },
          { label: "Approver Note", key: "ApproverNote" },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EditModal
        opened={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Leave Request"
        isSuccess={isSuccess}
        getError={getError}
      >
        <input type="hidden" name="actionType" value="edit" />
        <input
          type="hidden"
          name="LeaveRequestID"
          value={selected?.LeaveRequestID ?? ""}
        />

        <TextInput
          name="LeaveType"
          label="Leave Type"
          defaultValue={selected?.LeaveType}
          required
        />
        <DateTimePicker
          name="StartDate"
          label="Start Date"
          defaultValue={selected?.StartDate}
          required
        />
        <DateTimePicker
          name="EndDate"
          label="End Date"
          defaultValue={selected?.EndDate}
          required
        />
        <TextInput
          name="Reason"
          label="Reason"
          defaultValue={selected?.Reason}
          required
        />
      </EditModal>

      <DeleteModal
        opened={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        hiddenFields={{
          actionType: "delete",
          LeaveRequestID: selected?.LeaveRequestID ?? "",
        }}
        message={`Are you sure you want to delete this leave request?`}
        isSuccess={isSuccess}
        getError={getError}
      />
    </>
  );
}

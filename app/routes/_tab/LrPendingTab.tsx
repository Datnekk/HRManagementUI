import { Menu } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { IconCheck } from "@tabler/icons-react";
import React from "react";
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
  const fetcher = useFetcher<ActionResponse>();

  function handleApprove(id: number) {
    fetcher.submit(
      { actionType: "approve", id: Number(id) },
      { method: "post" }
    );
  }

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
      onEdit={(item) => {
        console.log("Edit department", item);
      }}
      onDelete={(item) => {
        console.log("Delete department", item);
      }}
    />
  );
}

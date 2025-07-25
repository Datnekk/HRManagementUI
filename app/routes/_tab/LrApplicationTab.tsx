import { Button, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { AddModal } from "~/components/AddModal";
import { TableWithActions } from "~/components/TableWithActions";
import { LeaveRequestDTO, MetaData } from "~/types/type";

export interface LeaveRequestApplicationTabProps {
  lrApp: LeaveRequestDTO[];
  meta: MetaData;
}

export default function LeaveRequestApplicationTab({
  lrApp,
  meta,
}: LeaveRequestApplicationTabProps) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <TableWithActions<LeaveRequestDTO>
        data={lrApp}
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
      <AddModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Leave Request"
        submitLabel="Create"
        isSuccess={(data) => data?.success === true}
        getError={(data) => (data?.success === false ? data?.message : null)}
      >
        <input type="hidden" name="actionType" value="create" />
        <TextInput name="LeaveType" label="Leave Type" required />
        <DateTimePicker name="StartDate" label="Start Date" required />
        <DateTimePicker name="EndDate" label="End Date" required />
        <TextInput name="Reason" label="Reason" required />
      </AddModal>
    </>
  );
}

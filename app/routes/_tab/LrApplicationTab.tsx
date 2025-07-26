import {
  Badge,
  Button,
  Card,
  Group,
  Stack,
  TextInput,
  Text,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { AddModal } from "~/components/AddModal";
import { TableWithActions } from "~/components/TableWithActions";
import { LeaveRequestDTO, MetaData, RemainDayDTO } from "~/types/type";

export interface LeaveRequestApplicationTabProps {
  lrApp: LeaveRequestDTO[];
  remainDay: RemainDayDTO;
  meta: MetaData;
}

export default function LeaveRequestApplicationTab({
  lrApp,
  remainDay,
  meta,
}: LeaveRequestApplicationTabProps) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        mb="lg"
        className="py-4"
      >
        <Group justify="space-between">
          <Stack gap={4}>
            <Text fw={600} size="lg">
              Leave Balance
            </Text>
            <Group>
              <Badge color="red" size="lg" radius="sm">
                Used: {remainDay.Used}
              </Badge>
              <Badge color="green" size="lg" radius="sm">
                Remaining: {remainDay.Remaining}
              </Badge>
            </Group>
          </Stack>
        </Group>
      </Card>
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

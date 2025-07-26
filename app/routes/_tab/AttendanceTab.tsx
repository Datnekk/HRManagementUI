import { Button } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { IconCheck, IconCircleOff } from "@tabler/icons-react";
import React from "react";
import { TableWithActions } from "~/components/TableWithActions";
import { AttendanceDTO, MetaData } from "~/types/type";
import { notifyError, notifySuccess } from "~/utils/notif";

export interface AttendanceTabProps {
  attendances: AttendanceDTO[];
  meta: MetaData;
}

type ActionResponse = {
  success: boolean;
  message: string;
};

export default function AttendanceTab({
  attendances,
  meta,
}: AttendanceTabProps) {
  const fetcher = useFetcher<ActionResponse>();

  function handleCheckIn() {
    fetcher.submit({ actionType: "check-in" }, { method: "post" });
  }

  function handleCheckOut() {
    fetcher.submit({ actionType: "check-out" }, { method: "post" });
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
    <TableWithActions<AttendanceDTO>
      data={attendances}
      meta={meta}
      columns={[
        { label: "ID", key: "UserID" },
        { label: "Check In Time", key: "CheckInTime" },
        { label: "Check Out Time", key: "CheckOutTime" },
        { label: "Location", key: "Location" },
        { label: "Work Hour", key: "WorkHours" },
        { label: "Over Time Hour", key: "OvertimeHours" },
        { label: "Attendance Date", key: "AttendanceDate" },
      ]}
      headerActions={
        <>
          <Button
            leftSection={<IconCheck size={16} />}
            onClick={() => handleCheckIn()}
          >
            Check In
          </Button>
          <Button
            leftSection={<IconCircleOff size={16} />}
            onClick={() => handleCheckOut()}
          >
            Check Out
          </Button>
        </>
      }
    />
  );
}

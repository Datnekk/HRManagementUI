import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { TableWithActions } from "~/components/TableWithActions";
import { MetaData, PositionDTO } from "~/types/type";

export interface PositionTabProps {
  position: PositionDTO[];
  meta: MetaData;
}

export default function PositionTab({ position, meta }: PositionTabProps) {
  return (
    <TableWithActions<PositionDTO>
      data={position}
      meta={meta}
      headerActions={
        <>
          <Button
            leftSection={<IconPlus size={16} />}
            // onClick={() => setModalOpen(true)}
          >
            Add
          </Button>
        </>
      }
      columns={[
        { label: "ID", key: "PositionID" },
        { label: "Name", key: "PositionName" },
      ]}
      onEdit={(item) => {
        console.log("Edit pos", item);
      }}
      onDelete={(item) => {
        console.log("Delete pos", item);
      }}
    />
  );
}

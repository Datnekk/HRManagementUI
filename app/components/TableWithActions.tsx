import {
  Table,
  Group,
  Menu,
  ActionIcon,
  Box,
  Pagination,
  Input,
} from "@mantine/core";
import { IconEdit, IconTrash, IconDotsVertical } from "@tabler/icons-react";
import { LocaleLink } from "./shared/core/LocaleLink";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";

export interface TableWithActionsProps<T> {
  data: T[];
  meta: {
    PageNumber: number;
    PageSize: number;
    TotalCount: number;
    TotalPages: number;
  };
  columns: { label: string; key: keyof T }[];
  headerActions?: React.ReactNode;
  menuActions?: (row: T) => React.ReactNode;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function TableWithActions<T>({
  data,
  meta,
  columns,
  headerActions,
  menuActions,
  onEdit,
  onDelete,
}: TableWithActionsProps<T>) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(meta?.PageNumber);
  const [goToPage, setGoToPage] = useState<string>("");

  const handleGoToPage = () => {
    const pageNum = parseInt(goToPage, 10);
    if (!Number.isNaN(pageNum) && pageNum >= 1 && pageNum <= meta?.TotalPages) {
      setCurrentPage(pageNum);
      navigate(`?page=${pageNum}`);
      setGoToPage("");
    }
  };

  return (
    <Box className="space-y-4 border border-[--mantine-color-gray-2] rounded-lg p-4">
      {headerActions && (
        <Group justify="end" className="flex-wrap">
          {headerActions}
        </Group>
      )}

      <div className="overflow-x-auto">
        <Table striped className="min-w-full table-auto">
          <Table.Thead className="bg-gray-100">
            <Table.Tr className="border-b border-[--mantine-color-gray-2]">
              {columns.map((col) => (
                <Table.Th key={col.key as string} className="px-4 py-3 w-12">
                  {col.label}
                </Table.Th>
              ))}
              <Table.Th className="px-4 py-2 w-12 text-right"></Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {data.map((row, idx) => (
              <Table.Tr key={idx}>
                {columns.map((col) => (
                  <Table.Td key={col.key as string} className="px-6 py-2">
                    {String(row[col.key])}
                  </Table.Td>
                ))}
                <Table.Td className="px-6 py-2 text-right">
                  {(onEdit || onDelete || menuActions) && (
                    <Menu
                      shadow="md"
                      width={250}
                      position="bottom-end"
                      withArrow
                    >
                      <Menu.Target>
                        <ActionIcon
                          variant="subtle"
                          radius="xl"
                          size="lg"
                          className="bg-gray-100 hover:bg-gray-200"
                        >
                          <IconDotsVertical
                            size={16}
                            className="text-gray-600"
                          />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        {onEdit && (
                          <Menu.Item
                            leftSection={<IconEdit size={14} />}
                            onClick={() => onEdit(row)}
                          >
                            Edit
                          </Menu.Item>
                        )}

                        {onDelete && (
                          <Menu.Item
                            leftSection={<IconTrash size={14} />}
                            color="red"
                            onClick={() => onDelete(row)}
                          >
                            Delete
                          </Menu.Item>
                        )}

                        {menuActions?.(row)}
                      </Menu.Dropdown>
                    </Menu>
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <div className="flex items-center justify-between px-6 py-4 text-sm text-gray-500 border-t border-gray-200">
          <span>
            Showing {meta?.PageNumber} to {meta?.PageSize} of {meta?.TotalPages}{" "}
            results
          </span>
          <div className="flex items-center gap-3">
            <Pagination
              total={meta?.TotalPages}
              value={currentPage}
              onChange={setCurrentPage}
              withControls
              getItemProps={(page) => ({
                component: LocaleLink,
                to: `?pageNumber=${page}`,
              })}
            />

            <div className="flex items-center gap-2">
              <span> | Go to page</span>
              <Input
                value={goToPage}
                onChange={(e) => setGoToPage(e.target.value)}
                size="xs"
                style={{ width: 50 }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGoToPage();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus,
} from "@tabler/icons-react";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  { title: "Revenue", icon: "receipt", value: "13,456", diff: 34 },
  { title: "Profit", icon: "coin", value: "4,145", diff: -13 },
  { title: "Coupons usage", icon: "discount", value: "745", diff: 18 },
  { title: "New customers", icon: "user", value: "188", diff: -30 },
] as const;

export default function Dashboard() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className="font-bold uppercase">
            {stat.title}
          </Text>
          <Icon
            className="text-gray-400 dark:text-gray-500"
            size={22}
            stroke={1.5}
          />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className="text-2xl font-bold leading-none">{stat.value}</Text>
          <Text
            c={stat.diff > 0 ? "teal" : "red"}
            fz="sm"
            fw={500}
            className="flex items-center leading-none"
          >
            <span>{stat.diff}%</span>
            <DiffIcon size={16} stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <div className="p-9">
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  );
}

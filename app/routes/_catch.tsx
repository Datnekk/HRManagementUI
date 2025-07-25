import { Button, Group, Text, Title } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { LocaleLink } from "../components/shared/core/LocaleLink";

export default function CatchPage() {
  return (
    <div className="space-y-4 mt-10">
      <Title order={1} className="text-center">
        404
      </Title>

      <Text>Trang này không tồn tại</Text>

      <Group className="flex justify-center gap-8">
        <Button component={LocaleLink} to="/" leftSection={<IconHome />}>
          Quay về trang chủ
        </Button>
      </Group>
    </div>
  );
}

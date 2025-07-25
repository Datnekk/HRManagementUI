import { Button, Container, Group, Title, Text } from "@mantine/core";
import { LocaleLink } from "~/components/shared/core/LocaleLink";

export default function Index() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b shadow-sm">
        <Container size="lg" className="py-4 flex justify-between items-center">
          <Title order={2} className="text-xl font-bold text-blue-600">
            User Management System
          </Title>
          <Group>
            <Button component={LocaleLink} to="/login" variant="default">
              Login
            </Button>
          </Group>
        </Container>
      </header>

      <section className="flex-grow flex items-center justify-center text-center">
        <Container size="md" className="py-4 space-y-6">
          <Title order={1} className="text-4xl font-bold mb-4 text-blue-600">
            Welcome to the User Management System
          </Title>
          <Text size="lg" className="text-gray-600 mb-8">
            Manage users, roles, and permissions all in one place.
          </Text>
          <Group className="flex justify-self-center gap-8">
            <Button component={LocaleLink} to="/login" size="md">
              Get Started
            </Button>
          </Group>
        </Container>
      </section>

      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </main>
  );
}

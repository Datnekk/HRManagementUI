import {
  ActionIcon,
  AppShell,
  Button,
  Group,
  Menu,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Outlet, useLoaderData, useSubmit } from "@remix-run/react";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import clsx from "clsx";
import { LocaleLink } from "~/components/shared/core/LocaleLink";
import { NavbarNested } from "./NavbarNested";
import { requireAuth } from "~/server/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { email, roles } = await requireAuth(request);

  return { email, roles };
};

export default function Layout() {
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const [navbarCollapsed, setNavbarCollapsed] = useLocalStorage<boolean>({
    key: "navbar-collapsed",
    defaultValue: false,
  });

  const toggleNavbarDesktop = () => {
    setNavbarCollapsed(!navbarCollapsed);
  };

  return (
    <AppShell
      navbar={{
        width: navbarCollapsed ? 80 : 250,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Navbar
        p="md"
        className={clsx("z-[1001]", navbarCollapsed ? "w-20" : "w-64")}
      >
        <AppShell.Section pb="md">
          <Group
            justify={navbarCollapsed ? "center" : "space-between"}
            align="center"
          >
            <Title className={clsx("text-sm", navbarCollapsed && "hidden")}>
              UMS
            </Title>
            <ActionIcon variant="light" onClick={toggleNavbarDesktop} size="lg">
              {navbarCollapsed ? (
                <IconLayoutSidebarRightCollapse
                  size={24}
                  className="bg-[--mantine-color-blue-0] text-black"
                />
              ) : (
                <IconLayoutSidebarLeftCollapse
                  size={24}
                  className="bg-[--mantine-color-blue-0] text-black"
                />
              )}
            </ActionIcon>
          </Group>
        </AppShell.Section>

        <AppShell.Section grow my="md" component={ScrollArea}>
          <NavbarNested collapsed={navbarCollapsed} roles={data.roles} />
        </AppShell.Section>

        <AppShell.Section>
          <Menu
            shadow="md"
            position="right-end"
            withArrow
            arrowPosition="center"
            trigger="click-hover"
            withinPortal={false}
            trapFocus={false}
            menuItemTabIndex={0}
          >
            <Menu.Target>
              <Button
                className={clsx("w-full", !navbarCollapsed && "px-0")}
                variant="subtle"
                justify="space-between"
                leftSection={<IconUser size={18} />}
              >
                <span className={clsx(navbarCollapsed && "hidden")}>
                  {data.email}
                </span>
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component={LocaleLink}
                to="/account/change-password"
                leftSection={<IconSettings size={14} />}
              >
                Settings
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                color="red"
                leftSection={<IconLogout size={14} />}
                onClick={() =>
                  submit(null, {
                    method: "POST",
                    action: "/signout",
                  })
                }
              >
                Sign Out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main className="pt-[calc(1rem*1)]">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

import {
  IconBuilding,
  IconCalendarMonth,
  IconCashRegister,
  IconDashboard,
  IconSettings,
  IconUserOff,
  IconUsers,
} from "@tabler/icons-react";
import { LinksGroup, LinksGroupProps } from "./LinkGroup";

export interface NavbarNestedProps {
  collapsed: boolean;
  roles: string[];
}

export function NavbarNested({ collapsed, roles }: NavbarNestedProps) {
  const isAdmin = roles?.includes("Admin");
  const isHr = roles?.includes("HR");
  const isEmployee = roles?.includes("Employee");
  const items = getNavItem(isAdmin, isHr, isEmployee);
  const links = items.map((item) => (
    <LinksGroup {...item} key={item.label} collapsed={collapsed} />
  ));

  return <div>{links}</div>;
}

const getNavItem = (isAdmin: boolean, isHr: boolean, isEmployee: boolean): LinksGroupProps[] => {
  const baseItems: LinksGroupProps[] = [
    {
      label: "Attendance",
      icon: <IconCalendarMonth />,
      initiallyOpened: true,
      link: `/attendance`,
    },
    {
      label: "Leave",
      icon: <IconUserOff />,
      initiallyOpened: true,
      link: `/leave`,
    },
    {
      label: "Payroll",
      icon: <IconCashRegister />,
      initiallyOpened: true,
      link: `/pay-roll`,
    },
    {
      label: "Settings",
      icon: <IconSettings />,
      initiallyOpened: true,
      link: `/settings`,
    },
  ];

  const extraItems: LinksGroupProps[] = [];

  if (isAdmin) {
    extraItems.push(
      {
        label: "Dashboard",
        icon: <IconDashboard />,
        initiallyOpened: true,
        link: `/dashboard`,
      },
      {
        label: "Organization",
        icon: <IconBuilding />,
        initiallyOpened: true,
        link: `/organization`,
      },
      {
        label: "Employees",
        icon: <IconUsers />,
        initiallyOpened: true,
        link: `/employee`,
      }
    );
  } else if (isHr) {
    extraItems.push({
      label: "Employees",
      icon: <IconUsers />,
      initiallyOpened: true,
      link: `/employee`,
    });
  } else if (isEmployee) {
    extraItems.push({
      label: "Statistical",
      icon: <IconUsers />,
      initiallyOpened: true,
      link: `/statistical`,
    });
  }

  const seen = new Set<string>();
  const combined = [...extraItems, ...baseItems].filter((item) => {
    if (seen.has(item.label)) return false;
    seen.add(item.label);
    return true;
  });

  return combined;
};

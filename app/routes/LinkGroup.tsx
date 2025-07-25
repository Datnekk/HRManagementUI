import {
  Box,
  Collapse,
  Group,
  ThemeIcon,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import clsx from "clsx";
import { type PropsWithChildren, type ReactNode, useState } from "react";
import { LocaleNavLink } from "~/components/shared/core/LocaleNavLink";

export type LinksGroupProps = {
  icon: ReactNode;
  label: string;
  end?: boolean;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string; end?: boolean }[];
  collapsed?: boolean;
};

export function LinksGroup({
  icon,
  label,
  initiallyOpened,
  links,
  link,
  end,
  collapsed,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const items = (hasLinks ? links : []).map((link) => (
    <LocaleNavLink
      className={({ isActive, isPending }) =>
        clsx(
          "block font-medium pl-8 pr-4 py-2 ml-6 border-l border-[--mantine-color-dark-0] text-[--mantine-color-gray-7] hover:bg-[--mantine-color-gray-0]",
          {
            "bg-[--mantine-color-blue-0]": isActive,
            "bg-[--mantine-color-gray-1]": isPending,
          }
        )
      }
      to={link.link}
      key={link.label}
    >
      {link.label}
    </LocaleNavLink>
  ));

  const wrapperClasses =
    "block px-2 py-2 w-full font-medium hover:bg-[--mantine-color-gray-0]";
  const Wrapper = ({ children }: PropsWithChildren) =>
    !link ? (
      <UnstyledButton
        className={wrapperClasses}
        onClick={() => setOpened((o) => !o)}
      >
        {children}
      </UnstyledButton>
    ) : (
      <LocaleNavLink
        className={({ isActive, isPending }) =>
          clsx(wrapperClasses, {
            "bg-[--mantine-color-blue-0]": isActive,
            "bg-[--mantine-color-gray-1]": isPending,
          })
        }
        to={link ?? "#"}
        end={end}
      >
        {children}
      </LocaleNavLink>
    );

  return (
    <>
      <Wrapper>
        <Group justify="space-between" gap={0}>
          {collapsed ? (
            <Tooltip
              label={label}
              position="right"
              withArrow
              withinPortal
              zIndex={2000}
            >
              <ThemeIcon variant="transparent" color="dark" size={30}>
                {icon}
              </ThemeIcon>
            </Tooltip>
          ) : (
            <Box style={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="transparent" color="dark" size={30}>
                {icon}
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
          )}

          {hasLinks && (
            <IconChevronDown
              stroke={1.5}
              size={16}
              className={clsx("transition-all", {
                "transform-none": !opened,
                "-rotate-180": opened,
              })}
              style={{ transform: opened ? "rotate(-90deg)" : "none" }}
            />
          )}
        </Group>
      </Wrapper>

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

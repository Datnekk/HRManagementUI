import { NavLink, NavLinkProps } from "@remix-run/react";
import type React from "react";
import { getLocalizedLink } from "~/utils/other";

type LocaleNavLinkProps = NavLinkProps &
  Omit<React.RefAttributes<HTMLAnchorElement>, "className" | "ref">;

/**
 * Get a link with the current locale parameter
 * @returns A localized <NavLink>
 */
export const LocaleNavLink = ({
  children,
  to,
  ...args
}: LocaleNavLinkProps) => {
  return (
    <NavLink {...args} to={getLocalizedLink({ to })}>
      {children}
    </NavLink>
  );
};

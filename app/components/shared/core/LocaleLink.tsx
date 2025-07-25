import type React from "react";
import { Link, type LinkProps } from "react-router-dom";
import { getLocalizedLink } from "~/utils/other";

type LocaleLinkProps = LinkProps &
  Omit<React.RefAttributes<HTMLAnchorElement>, "ref">;

/**
 * Get a link with the current locale parameter
 * @returns A localized <Link>
 */
export const LocaleLink = ({ children, to, ...args }: LocaleLinkProps) => {
  return (
    <Link {...args} to={getLocalizedLink({ to })}>
      {children}
    </Link>
  );
};

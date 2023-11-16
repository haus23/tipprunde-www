/* eslint-disable no-restricted-imports */
import { NavLink as RemixLink, type NavLinkProps as RemixLinkProps } from '@remix-run/react';
import { forwardRef } from 'react';

interface LinkProps extends RemixLinkProps {}

const NavLink = forwardRef<HTMLAnchorElement, LinkProps>(({ children, ...props }, ref) => {
  return (
    <RemixLink unstable_viewTransition {...props} ref={ref}>
      {children}
    </RemixLink>
  );
});
NavLink.displayName = 'NavLink';

export { NavLink };

/* eslint-disable no-restricted-imports */
import { Link as RemixLink, type LinkProps as RemixLinkProps } from '@remix-run/react';
import { forwardRef } from 'react';

interface LinkProps extends RemixLinkProps {}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ children, ...props }, ref) => {
  return (
    <RemixLink unstable_viewTransition {...props} ref={ref}>
      {children}
    </RemixLink>
  );
});
Link.displayName = 'Link';

export { Link };

import {
  type LinkProps,
  type NavLinkProps,
  Link as RRLink,
  NavLink as RRNavLink,
} from 'react-router';

namespace Link {
  export interface Props extends LinkProps {}
}

export function Link({ ...props }: Link.Props) {
  return <RRLink viewTransition {...props} />;
}

namespace NavLink {
  export interface Props extends NavLinkProps {}
}

export function NavLink({ ...props }: NavLink.Props) {
  return <RRNavLink viewTransition {...props} />;
}

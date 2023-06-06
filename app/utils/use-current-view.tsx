import { useMatches } from '@remix-run/react';

export function useCurrentView() {
  const matches = useMatches();

  const viewRouteMatch = matches.at(-1);

  if (
    viewRouteMatch &&
    viewRouteMatch.handle &&
    viewRouteMatch.handle.viewPath &&
    typeof viewRouteMatch.handle.viewPath === 'string'
  ) {
    return viewRouteMatch.handle.viewPath;
  }

  return '';
}

export function getUrlSearchParams(search: string): { [key: string]: string } {
  if (!search) {
    return {};
  }

  return search
    .slice(1)
    .split('&')
    .map(p => p.split('='))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
}

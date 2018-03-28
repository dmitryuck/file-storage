export function buildRouteUrl(route: string, ...params: string[]): string {
    return `/${route}/:${params.reduce((res, param) => res = res + '/:' + param)}`;
}
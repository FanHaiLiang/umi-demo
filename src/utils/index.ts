import { IBestAFSRoute } from '/config/routes';

export type MenusDIC = {
    [key: string]: IBestAFSRoute
}
// 递归筛选需要隐藏 或者 没有权限的 route
export const getRoues = (routes: IBestAFSRoute[], menusDIC: MenusDIC) => routes.filter(d => {
    menusDIC[d.path] = { ...d }
    // 筛掉没有name 和 hideInMenu: true 的menu
    if (!d.name || d.hideInMenu) return false;

    if (d.routes) {
        d.routes = getRoues(d.routes, menusDIC)
    }

    return true
});
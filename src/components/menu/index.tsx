// 导航菜单的控制
import { useEffect, useState, useMemo } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation, useModel } from '@umijs/max';
import { IBestAFSRoute } from '../../../config/routes';
import styles from './index.less';

export default () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const { initialState: { menuData, menusDIC } } = useModel('@@initialState');

    // 自己控制 父级菜单的展开
    useEffect(() => {
        const currentUrlObj = menusDIC[pathname];
        const pathnameArr = pathname.split('/');

        // 如果存在name 没有隐藏 并且有四级的 默认打开父级
        if (currentUrlObj && currentUrlObj.name && !currentUrlObj.hideInMenu && pathnameArr.length > 3) {
            const newOpenkey = `/${pathnameArr[1]}/${pathnameArr[2]}`;
            if (!openKeys.includes(newOpenkey)) {
                setOpenKeys([...openKeys, newOpenkey])
            }
        }
    }, [pathname]);

    // 格式化menu 符合menu标准
    const formatMenu = (routes: IBestAFSRoute[]) => {
        if (!routes) return [];
        return routes.map((route: IBestAFSRoute): IBestAFSRoute => {
            const DmgData = route.icon && route.icon() || null
            return {
                label: route.name,
                key: route.path,
                icon: DmgData ? DmgData.default() : null,
                children: route.routes && route.routes.length > 0 && formatMenu(route.routes)
            };
        });
    };

    // 格式化一下 routes 使其符合 menu组件
    const formatRoutes = useMemo(() => formatMenu(menuData), [menuData])

    // 点击父级菜单
    const onOpenChange = (oks: string[]) => setOpenKeys([...oks]);

    // 控制menu点击
    const onClickMenu = (item) => {
        navigate(item.key);
    };

    return (
        <div className={styles.menuWrap}>
            <Menu
                selectedKeys={[pathname]}
                onClick={onClickMenu}
                mode="inline"
                openKeys={[...openKeys]}
                onOpenChange={onOpenChange}
                items={formatRoutes}
            />
        </div>
    )
};
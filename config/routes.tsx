export interface IBestAFSRoute {
    // 兼容一下 menu
    label?: string;
    // url on browser
    path: string;
    // redirect to other route
    redirect?: string;
    // component path and name, relative to src/pages
    component?: string;
    // name of the route, will be used as menu name
    // set menu.[name] as key in locale files to support i18n
    name?: string;
    // pick icon here https://is.motion.abb.com.cn/sb/?path=/story/components-mois-icon-gallery--page
    // ONLY FOR MENU!!!! use <AbbIcon name='home' /> on other places
    icon?: () => React.ReactElement | null | string;
    /*************************************************************/
    // target of the link, default is _self
    target?: string;

    // see https://umijs.org/docs/max/layout-menu#%E6%89%A9%E5%B1%95%E7%9A%84%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE
    // ---https://procomponents.ant.design/components/layout/#prolayout
    // ---https://beta-pro.ant.design/docs/advanced-menu-cn#%E6%A0%B9%E6%8D%AE%E8%B7%AF%E5%BE%84%E6%9B%B4%E6%8D%A2%E5%B8%83%E5%B1%80
    // control the title menu bar
    headerRender?: boolean;
    footerRender?: boolean;
    // control the side menu bar
    menuRender?: boolean;
    menuHeaderRender?: boolean;

    // see umi-access we use this plugin to control permission to access a particular route
    access?: string;

    /** 当前页面的面包屑是否隐藏 */
    showBreadcrumb?: boolean;

    // DANGER: DO NOT USE THIS, UNLESS YOU EXACTLY KNOW WHAT YOU ARE DOING
    /** 默认为 false，在菜单中隐藏此项包括子项 */
    // menu?: false | IRouteMenuConfig;

    /** 默认为 true ，是否显示 Layout */
    layout?: boolean;

    // set the menu behavior
    hideChildrenInMenu?: boolean;
    hideInMenu?: boolean;
    hideInBreadcrumb?: boolean;
    flatMenu?: boolean;
    routes?: IBestAFSRoute[];

    // ignore type warning, do not manually set these values
    absPath?: string;
    file?: string;
    id?: string;
    wrappers?: string[];
};

// 渠道用户导航
export const channelRoutes = [
    {
        name: '首页',
        icon: () => require("@/common/iconSvg/icon_dashboard"),
        path: '/channel/home',
        component: './Home',
    },
    {
        name: '订单中心',
        icon: () => require("@/common/iconSvg/icon_dashboard"),
        path: '/channel/order',
        component: './Access',
    },
    {
        name: '代办',
        icon: () => require("@/common/iconSvg/icon_dashboard"),
        path: '/channel/agency',
        component: './Table',
    }
];

// 渠道专员导航
export const channelCommissioner = [
    {
        name: '数据看板',
        icon: () => require("@/common/iconSvg/icon_dashboard"),
        path: '/channel-commissioner/home',
        component: './Home',
    },
    {
        name: '订单中心',
        icon: () => require("@/common/iconSvg/icon_order"),
        path: '/channel-commissioner/order',
        component: './order'
    },
    {
        name: '订单详情',
        path: '/channel-commissioner/order/detail',
        hideInMenu: true,
        component: './Detail',
        // 面包屑
        crumb: [
            {
                name: '订单中心',
                icon: () => require("@/common/iconSvg/icon_order")
            },
            {
                name: '订单详情',
            }
        ]
    },
    {
        name: '代办',
        icon: () => require('@/common/iconSvg/icon_todo'),
        path: '/channel-commissioner/agency',
        component: './Table'
    },
    {
        name: '产品管理',
        icon: () => require('@/common/iconSvg/icon_product'),
        path: '/channel-commissioner/product',
        component: './Table',
    },
    {
        name: '管理中心',
        icon: () => require('@/common/iconSvg/icon_user'),
        path: '/channel-commissioner/manage',
        component: './Table',
        routes: [{
            name: '渠道管理',
            path: '/channel-commissioner/manage/incomplete',
            component: './Access',
        }, {
            name: '客户管理',
            path: '/channel-commissioner/manage/detail',
            component: './Detail',
        },
        {
            name: '渠道用户管理',
            path: '/channel-commissioner/manage/channel-user-manage',
            component: './Access',
        },
        {
            name: '渠道政策管理',
            path: '/channel-commissioner/manage/channel-policy-manage',
            component: './Access',
        },
        ]
    },
];

// 管理员导航
export const administratorsRoues = [
    {
        name: '首页',
        icon: () => require("@/common/iconSvg/icon_dashboard"),
        path: '/admin/home',
        component: './Home',
    },
    {
        name: '用户管理',
        icon: () => require("@/common/iconSvg/icon_dashboard"),
        path: '/admin/user',
        component: './Access',
    },
    {
        name: '渠道管理',
        icon: () => require("@/common/iconSvg/icon_dashboard"),
        path: '/admin/channel',
        component: './Table',
    },
    {
        name: '客户管理',
        icon: () => require("@/common/iconSvg/icon_dashboard"),
        path: '/admin/customer',
        component: './Table',
    },
    {
        name: '产品管理',
        icon: () => require("@/common/iconSvg/icon_dashboard"),
        path: '/admin/product',
        component: './Table',
    },
    {
        name: '政策管理',
        icon: () => require("@/common/iconSvg/icon_dashboard"),
        path: '/admin/policy',
        component: './Table',
    },
];

const routes: IBestAFSRoute[] = [
    {
        path: '/login',
        component: './Login',
        layout: false,
    },

    {
        path: '/',
        wrappers: [
            '@/wrappers/auth',
        ],
        routes: [
            ...channelRoutes,
            ...channelCommissioner,
            ...administratorsRoues,
        ]
    },
    {
        path: '403',
        name: 'NotAccessible',
        component: '403',
        hideInMenu: true,
        headerRender: false,
        menuRender: false,
        menuHeaderRender: false,
    },
    {
        path: '*',
        name: 'NotFound',
        component: '404',
        hideInMenu: true,
        headerRender: false,
        menuRender: false,
        menuHeaderRender: false,
    },
];

export default routes;
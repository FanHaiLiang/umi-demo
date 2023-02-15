import { useState } from 'react';
import { Outlet, useNavigate } from '@umijs/max';
import { Layout, Dropdown } from 'antd';
import classNames from 'classnames';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    DownOutlined
} from '@ant-design/icons';

import Menu from '@/components/menu';
import Crumbs from '@/components/crumbs';
import LoginUserIcon from '@/common/iconSvg/icon_login_user';
import styles from './index.less';

import logPng from '@/assets/images/logo.png';
import { Footer } from 'antd/es/layout/layout';

const { Header, Sider, Content } = Layout;

const dropdownMenus = [
    {
        label: <><LogoutOutlined /> 退出登录</>,
        key: '1',
    },
];

const LayoutWrap = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    // 控制收起菜单或者展开菜单
    const changeCollapsed = () => setCollapsed(!collapsed);

    // 退出登陆
    const onDropdownClick = (item) => {
        if (item.key === '1') {
            // 到登录页面
            navigate('/login')
        };
    };

    return <Layout className={styles.layout}>
        <Sider
            width={240}
            className={styles.sider}
            collapsed={collapsed}
            collapsedWidth="48"
        >
            <div onClick={() => navigate('/')} className={classNames(styles.head, { [styles.smallhead]: collapsed })}>
                <div className={styles.log}>
                    <img src={logPng} alt="log" />
                </div>
                <div className={styles.projectName}>渠道在线订单管理系统</div>
            </div>
            <div className={styles.menu}>
                <Menu />
            </div>
            <div onClick={changeCollapsed} className={styles.collapsedWrap}>
                {
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                }
            </div>
        </Sider>
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>
                    <Crumbs />
                </div>
                <div className={styles.right}>
                    <Dropdown arrow className={styles.logout} menu={{ items: dropdownMenus, onClick: onDropdownClick }}>
                        <div className={styles.user}>
                            <LoginUserIcon />
                            {/* <img className={styles.userPng} src={userPng} alt="user" /> */}
                            &nbsp;&nbsp;
                            user
                            &nbsp;&nbsp;
                            <DownOutlined />
                        </div>
                    </Dropdown>
                </div>
            </Header>
            <Content className={styles.content}>
                <Outlet />
            </Content>
            <Footer className={styles.footer}>
                Copyright 2023 贝加莱&nbsp;&nbsp;|&nbsp;&nbsp;沪ICP备xxxxx&nbsp;&nbsp;|&nbsp;&nbsp;沪公安网备xxxxxxxx号
            </Footer>
        </Layout>

    </Layout>
}

export default LayoutWrap;
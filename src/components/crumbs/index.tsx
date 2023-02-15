import { useMemo } from 'react';
import { useModel, useLocation } from '@umijs/max';
// 面包屑
import classnames from 'classnames';
import {
    RightOutlined
} from '@ant-design/icons';
import styles from './index.less';

// 面包屑中间的箭头
const RightOutlineCom = ({ index, len }) => (index < len - 1) ? <>&nbsp;&nbsp;<RightOutlined />&nbsp;&nbsp;</> : null;
// 面包屑中的icon
const IconCom = ({ icon }) => icon ? <>{icon()?.default()}&nbsp;</> : null;
// 面包屑名称显示
const NameCom = ({ name, len, index }) => <div className={classnames(styles.name, { [styles.activeName]: (len - 1 === index && len > 1) })}>{name}</div>;

export default () => {
    const location = useLocation()
    const { initialState: { menusDIC } } = useModel('@@initialState');
    // 获取面包屑 名称 和 iocn
    const [crumbs, crumbsLen] = useMemo(() => {
        const { crumb, ...route } = menusDIC[window.location.pathname] || {};

        // 如果在route 中定义了 crumb的直接显示
        if (crumb) {
            return [crumb, crumb.length]
        }
        // 没定义的显示name
        return [[{
            name: route.name,
        }], 1]
    }, [location.pathname]);

    return <div className={styles.crumbWrap}>
        {
            crumbs?.map((crumb, index) => {
                return <div className={styles.itemWrap} key={index}>
                    <IconCom icon={crumb.icon} />
                    <NameCom name={crumb.name} index={index} len={crumbsLen} />
                    <RightOutlineCom index={index} len={crumbsLen} />
                </div>
            })
        }
    </div>
};
import { Link } from '@umijs/max';
import { Button } from 'antd';

import Card from '@/common/card';

export default () => {
    return <Card>
        订单中中心
        &nbsp;
        <Button type="link">
            <Link to="/channel-commissioner/order/detail">去订单详情</Link>
        </Button>
        
    </Card>
}
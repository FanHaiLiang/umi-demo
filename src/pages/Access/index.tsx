import { Access, useAccess, useModel, Link, useRequest } from '@umijs/max';
import { Button } from 'antd';

import service from '@/services/demo';

const AccessPage: React.FC = () => {

  const { loading, data, run, cancel } = useRequest(service.UserController.getDriveVeryfy);

  const access = useAccess();
  // const navigate = useNavigate();
  const { refresh } =
    useModel('@@initialState');

  return (
    <>
      <Access accessible={access.canSeeAdmin}>
        <Button onClick={refresh}>重新执行 初始化函数</Button>
        <Button loading={loading} onClick={() => run()}>重新请求</Button>
      </Access>
      <Link to="/channel-commissioner/order/detail">去详情</Link>
    </>
  );
};

export default AccessPage;

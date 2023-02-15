import { useModel } from '@umijs/max';
import Card from '@/common/card';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <Card>{name}</Card>
  );
};

export default HomePage;

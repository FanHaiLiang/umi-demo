// Card 组件封装
import styles from './index.less';
export default ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.cardWrap}>
        {children}
    </div>
}
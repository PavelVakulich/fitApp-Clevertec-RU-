import { Image } from 'antd';
import styles from './logo.module.css';
import logo from '/logo.svg';

export const Logo = () => (
    <div className={styles.logo_container}>
        <Image preview={false} src={logo} className={styles.logo} />
    </div>
);

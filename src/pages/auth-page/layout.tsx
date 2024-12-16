import { Outlet } from 'react-router-dom';
import styles from './styles/layout.module.css';

export const Layout = () => {
    return (
        <div className={styles.background}>
            <div className={styles.blur_background}>
                <Outlet />
            </div>
        </div>
    );
};

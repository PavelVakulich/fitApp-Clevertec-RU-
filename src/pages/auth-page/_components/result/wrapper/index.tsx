import styles from './wrapper.module.css';

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className={styles.wrapper}>{children}</div>
);

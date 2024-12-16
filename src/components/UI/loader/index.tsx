import styles from './loader.module.css';

import Lottie from 'lottie-react';
import loaderAnimation from './loader.json';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/storeSetting';

export const Loader = () => {
    const isLoading = useSelector((state: RootState) => state.loader.isLoading);

    const hiddenClass = isLoading ? '' : styles.loader_hidden;

    return (
        <div className={`${styles.loader} ${hiddenClass}`}>
            <div className={styles.loader_container}>
                <Lottie
                    animationData={loaderAnimation}
                    style={{ width: '150px', height: '150px' }}
                    data-test-id='loader'
                />
            </div>
        </div>
    );
};

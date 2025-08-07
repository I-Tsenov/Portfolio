import React from 'react';
import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.text404}>404</h1>
            <h2 className={styles.textNotFound}>Page Not Found</h2>
            <p className={styles.textBody}>Oops! The page you are looking for does not exist.</p>
            <Link key="home" to="/" className={styles.goHomeLink}>
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;

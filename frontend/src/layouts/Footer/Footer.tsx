import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    return <footer className={styles.footer}>© {year} Front-end developerment by human efforts</footer>;
};

export default Footer;

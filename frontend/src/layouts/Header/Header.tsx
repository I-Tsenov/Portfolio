import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggleBtn from '@src/components/ThemeToggleBtn';
import styles from './Header.module.scss';
import FlexBox from '@src/components/FlexBox';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <header className={styles.header}>
            <Link className={styles.logoHeader} key="logo_header" to="/">
                {'< IT >'}
            </Link>
            <FlexBox justify="space-between" align="center" gap={3} fullWidth>
                <nav className={styles.navigation}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={location.pathname === link.to ? styles.navItemActive : styles.navItem}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <ThemeToggleBtn />
            </FlexBox>
        </header>
    );
};

export default Header;

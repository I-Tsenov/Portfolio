import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggleBtn from '@src/components/ThemeToggleBtn';
import { ReactComponent as Logo } from '@assets/logo.svg';
import styles from './Header.module.scss';

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
            <Link to="/" className={styles.logoHeader}>
                <Logo />
            </Link>
            <div className={styles.navGroup}>
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
            </div>
        </header>
    );
};

export default Header;

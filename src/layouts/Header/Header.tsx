import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggleBtn from '@components/ThemeToggleBtn';
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
            <Link className={styles.logoHeader} key="logo_header" to="/">
                {'< IT >'}
            </Link>
            <nav>
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
        </header>
    );
};

export default Header;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggleBtn from '@components/ThemeToggleBtn';
import styles from './Header.module.scss'


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
            <Link
                className={styles.logoHeader}
                key='logo_header'
                to='/'
            >
                {'< IT >'}
            </Link>
            <nav>
                {navLinks.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        style={{
                            marginRight: '1rem',
                            fontSize: '1.2rem',
                            textDecoration: 'none',
                            color: location.pathname === link.to ? 'rgb(6, 165, 149)' : '#fff',
                            fontWeight: location.pathname === link.to ? 'bold' : 'normal',
                        }}
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

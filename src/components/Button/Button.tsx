import React from 'react';
import styles from './Button.module.scss';

type Variant = 'primary' | 'secondary' | 'ghost';

interface Props {
    children: React.ReactNode;
    variant?: Variant;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, variant = 'primary', disabled = false, onClick, type = 'button' }: Props) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;

import React from 'react';
import styles from './Toggle.module.scss';

interface Props {
    checked: boolean;
    onChange: (value: boolean) => void;
    label?: string;
    onIcon?: React.ReactNode;
    offIcon?: React.ReactNode;
}

export default function Toggle({ checked, onChange, label, onIcon, offIcon }: Props) {
    return (
        <label className={styles.toggleWrapper}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className={styles.toggleInput}
            />
            <span className={styles.slider}>
                <span className={styles.icon}>{checked ? onIcon : offIcon}</span>
            </span>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    );
}

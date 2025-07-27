// Toast.tsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.scss';

export type ToastVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
    message: string;
    onClose: () => void;
    duration?: number;
    variant?: ToastVariant;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 7000, variant = 'default' }) => {
    const elRef = useRef<HTMLDivElement>(document.createElement('div'));

    // Mount into #toast-root and clean up reliably
    useEffect(() => {
        const el = elRef.current;
        const toastRoot = document.getElementById('toast-root') || document.body;
        toastRoot.appendChild(el);

        return () => {
            toastRoot.removeChild(el);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    console.log('CSS module keys:', Object.keys(styles));
    console.log('Looking for:', `toast--${variant}`);

    const toastClass = `${styles.toast} ${styles[variant]}`.trim();

    return createPortal(
        <div
            className={toastClass}
            role={variant === 'error' ? 'alert' : 'status'}
            aria-live={variant === 'error' ? 'assertive' : 'polite'}
        >
            {message}
        </div>,
        elRef.current
    );
};

export default Toast;

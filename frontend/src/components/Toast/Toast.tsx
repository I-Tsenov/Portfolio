import React, { useEffect } from 'react';
import styles from './Toast.module.scss';

type ToastProps = {
    message: string;
    onClose: () => void;
    duration?: number;
};

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return <div className={styles.toast}>{message}</div>;
};

export default Toast;

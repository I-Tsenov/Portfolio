import React from 'react';
import styles from './Tooltip.module.scss';

interface TooltipProps {
    message: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => (
    <div className={styles.container}>
        {children}
        <span className={styles.tooltip}>{message}</span>
    </div>
);

export default Tooltip;

import React, { type ReactNode } from 'react';
import styles from './LinkWrapper.module.scss';

type LinkWrapperProps = {
    href: string;
    children: ReactNode;
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string;
    ariaLabel?: string;
    className?: string;
};

const LinkWrapper: React.FC<LinkWrapperProps> = ({
    href,
    children,
    target = '_blank',
    rel = 'noopener noreferrer',
    ariaLabel,
    className,
}) => (
    <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={`${styles.linkWrapper} ${className || ''}`}
    >
        {children}
    </a>
);

export default LinkWrapper;

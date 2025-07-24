// FlexBox.tsx
import styles from './FlexBox.module.scss';
import { type ReactNode } from 'react';

type Props = {
    children: ReactNode;
    justify?: 'start' | 'center' | 'end' | 'space-between';
    align?: 'start' | 'center' | 'end';
    gap?: number;
    direction?: 'row' | 'column';
    className?: string;
};

export default function FlexBox({
    children,
    justify = 'start',
    align = 'start',
    gap = 0,
    direction = 'row',
    className = '',
}: Props) {
    return (
        <div
            className={`${styles.flexbox} ${className}`}
            style={{
                display: 'flex',
                flexDirection: direction,
                justifyContent: justify,
                alignItems: align,
                gap,
            }}
        >
            {children}
        </div>
    );
}

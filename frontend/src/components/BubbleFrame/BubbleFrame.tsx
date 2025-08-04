import React from 'react';
import styles from './BubbleFrame.module.scss';

type BubbleFrameProps = {
    src: string;
    alt?: string;
    size?: string;
    className?: string;
};

const BubbleFrame: React.FC<BubbleFrameProps> = ({ src, alt = '', className = '' }) => {
    return (
        <div className={`${styles.bubbleFrame}${className ? ` ${className}` : ''}`}>
            {/* 1. Center bubble clips its child image */}
            <div className={`${styles.bubble} ${styles.bubble1}`}>
                <img src={src} alt={alt} className={styles.image} />
            </div>

            {/* 2. Two outer border-only shells */}
            <div className={`${styles.bubble} ${styles.bubble2}`} />
            <div className={`${styles.bubble} ${styles.bubble3}`} />
        </div>
    );
};

export default BubbleFrame;

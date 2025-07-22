// Tooltip.tsx
import React, { useRef, useState, useLayoutEffect } from 'react';
import styles from './Tooltip.module.scss';

interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    offset?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'top', offset = 8 }) => {
    const [visible, setVisible] = useState(false);
    const [style, setStyle] = useState<React.CSSProperties>({});
    const [resolvedPosition, setResolvedPosition] = useState<'top' | 'bottom' | 'left' | 'right'>(position);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const tooltipId = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`);

    useLayoutEffect(() => {
        if (visible && tooltipRef.current && wrapperRef.current) {
            const tooltipEl = tooltipRef.current.getBoundingClientRect();
            const wrapperEl = wrapperRef.current.getBoundingClientRect();
            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight,
            };

            const computePosition = (pos: 'top' | 'bottom' | 'left' | 'right') => {
                const positions: Record<string, React.CSSProperties> = {
                    top: {
                        top: wrapperEl.top - tooltipEl.height - offset,
                        left: wrapperEl.left + wrapperEl.width / 2 - tooltipEl.width / 2,
                    },
                    bottom: {
                        top: wrapperEl.bottom + offset,
                        left: wrapperEl.left + wrapperEl.width / 2 - tooltipEl.width / 2,
                    },
                    left: {
                        top: wrapperEl.top + wrapperEl.height / 2 - tooltipEl.height / 2,
                        left: wrapperEl.left - tooltipEl.width - offset,
                    },
                    right: {
                        top: wrapperEl.top + wrapperEl.height / 2 - tooltipEl.height / 2,
                        left: wrapperEl.right + offset,
                    },
                };

                return positions[pos];
            };

            // Try desired position first
            let pos = computePosition(position);

            const fitsVertically =
                typeof pos.top === 'number' && pos.top >= 0 && pos.top + tooltipEl.height <= viewport.height;
            const fitsHorizontally =
                typeof pos.left === 'number' && pos.left >= 0 && pos.left + tooltipEl.width <= viewport.width;

            // Auto-fallbacks if overflowing
            let actualPosition = position;
            if (!fitsVertically || !fitsHorizontally) {
                const fallbackOrder: ('bottom' | 'top' | 'right' | 'left')[] = ['bottom', 'top', 'right', 'left'];
                for (const fallback of fallbackOrder) {
                    const testPos = computePosition(fallback);
                    const testTop = testPos.top ?? 0;
                    const testLeft = testPos.left ?? 0;
                    if (
                        typeof testTop === 'number' &&
                        typeof testLeft === 'number' &&
                        testTop >= 0 &&
                        testLeft >= 0 &&
                        testTop + tooltipEl.height <= viewport.height &&
                        testLeft + tooltipEl.width <= viewport.width
                    ) {
                        pos = testPos;
                        actualPosition = fallback;
                        break;
                    }
                }
            }
            setResolvedPosition(actualPosition);

            // Clamp to viewport
            if (typeof pos.top === 'number') {
                pos.top = Math.max(0, Math.min(pos.top, viewport.height - tooltipEl.height));
            }
            if (typeof pos.left === 'number') {
                pos.left = Math.max(0, Math.min(pos.left, viewport.width - tooltipEl.width));
            }

            setStyle(pos);
        }
    }, [visible, position, offset]);

    return (
        <div
            className={styles.wrapper}
            ref={wrapperRef}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            aria-describedby={tooltipId.current}
        >
            {children}
            {visible && (
                <div className={styles.tooltip} style={style} ref={tooltipRef} role="tooltip" aria-hidden={!visible}>
                    <div className={styles.arrow} data-position={resolvedPosition} />
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;

// Tooltip.tsx
import React, { useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Tooltip.module.scss';

type CornerPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type EdgePosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipPosition = CornerPosition | EdgePosition;
type TooltipProps = {
    children: React.ReactNode;
    content: React.ReactNode;
    position?: TooltipPosition;
    offset?: number;
};

// Helper: compute all eight placements, corners use center-edge logic
function computePosition(
    wrap: DOMRect,
    tip: DOMRect,
    pos: TooltipPosition,
    offset: number
): { top: number; left: number } {
    const cx = wrap.left + wrap.width / 2;

    switch (pos) {
        case 'top':
            return { top: wrap.top - tip.height - offset, left: cx - tip.width / 2 };
        case 'bottom':
            return { top: wrap.bottom + offset, left: cx - tip.width / 2 };
        case 'left':
            return {
                top: wrap.top + wrap.height / 2 - tip.height / 2,
                left: wrap.left - tip.width - offset,
            };
        case 'right':
            return {
                top: wrap.top + wrap.height / 2 - tip.height / 2,
                left: wrap.right + offset,
            };
        case 'topLeft':
            return { top: wrap.top - tip.height - offset, left: cx - tip.width };
        case 'topRight':
            return { top: wrap.top - tip.height - offset, left: cx };
        case 'bottomLeft':
            return { top: wrap.bottom + offset, left: cx - tip.width };
        case 'bottomRight':
            return { top: wrap.bottom + offset, left: cx };
        default:
            return { top: 0, left: 0 };
    }
}

const CORNERS: CornerPosition[] = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'top', offset = 8 }) => {
    const [visible, setVisible] = useState(false);
    const [style, setStyle] = useState<React.CSSProperties>({});
    const [resolvedPosition, setResolved] = useState<TooltipPosition>(position);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!visible || !wrapperRef.current || !tooltipRef.current) return;

        const wrapRect = wrapperRef.current.getBoundingClientRect();
        const tipRect = tooltipRef.current.getBoundingClientRect();
        const viewport = { width: window.innerWidth, height: window.innerHeight };

        // 1. Raw placement
        let nextStyle = computePosition(wrapRect, tipRect, position, offset);
        let nextPosition = position;

        // 2. Edge fallbacks (corners skip this)
        const isCorner = CORNERS.includes(position as CornerPosition);
        const fits = (xy: { top: number; left: number }) =>
            xy.top >= 0 &&
            xy.left >= 0 &&
            xy.top + tipRect.height <= viewport.height &&
            xy.left + tipRect.width <= viewport.width;

        if (!isCorner && !fits(nextStyle)) {
            const FALLBACKS: EdgePosition[] = ['bottom', 'top', 'right', 'left'];
            for (const fb of FALLBACKS) {
                const trial = computePosition(wrapRect, tipRect, fb, offset);
                if (fits(trial)) {
                    nextStyle = trial;
                    nextPosition = fb;
                    break;
                }
            }
        }

        // 3. Clamp inside viewport
        nextStyle.top = Math.max(0, Math.min(nextStyle.top, viewport.height - tipRect.height));
        nextStyle.left = Math.max(0, Math.min(nextStyle.left, viewport.width - tipRect.width));

        setStyle(nextStyle);
        setResolved(nextPosition);
    }, [visible, position, offset]);

    // Portal so position: fixed is always viewport‐relative
    const tooltipNode = visible
        ? createPortal(
              <div
                  ref={tooltipRef}
                  className={styles.tooltip}
                  style={{ position: 'fixed', ...style }}
                  role="tooltip"
                  data-position={resolvedPosition}
                  aria-hidden={!visible}
              >
                  <div className={styles.arrow} data-position={resolvedPosition} />
                  {content}
              </div>,
              document.body
          )
        : null;

    return (
        <div
            ref={wrapperRef}
            className={styles.wrapper}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            aria-describedby=""
        >
            {children}
            {tooltipNode}
        </div>
    );
};

export default Tooltip;

// src/components/BlossomLoader/BlossomLoader.tsx
import React, { useEffect, useRef } from 'react';
import styles from './BlossomLoader.module.scss';

const RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SPINNER_COLORS = ['lightpink', 'mistyrose', 'lavenderblush', 'peachpuff'];
const SPINNER_SEGMENT = CIRCUMFERENCE / SPINNER_COLORS.length;

const BRANCH_DEFS = [
    {
        key: 'main',
        d: 'M10,90 C30,70 50,60 70,45 C80,35 90,25 95,10',
        className: styles.branchMain,
        stroke: '#6E4225',
        strokeWidth: 3.5,
        delay: 0,
    },
    {
        key: 'up1',
        d: 'M30,75 C32,70 28,60 20,40',
        className: styles.branchOffUp,
        stroke: '#8B5A2B',
        strokeWidth: 2.4,
        delay: 0.4,
    },
    {
        key: 'up1-child',
        d: 'M24,50 C5,25 15,45 10,15',
        className: styles.branchChild,
        stroke: '#6B4423',
        strokeWidth: 1.5,
        delay: 0.8,
    },
    {
        key: 'up2',
        d: 'M50,60 C55,50 48,45 35,35',
        className: styles.branchOffUp,
        stroke: '#A0522D',
        strokeWidth: 2,
        delay: 1,
    },
    {
        key: 'up2-child1',
        d: 'M35,35 C32,30 28,25 20,20',
        className: styles.branchChild,
        stroke: '#8B3E1B',
        strokeWidth: 1.3,
        delay: 1.4,
    },
    {
        key: 'up2-child2',
        d: 'M35,35 C32,30 50,25 57,12',
        className: styles.branchChild,
        stroke: '#8B3E1B',
        strokeWidth: 1.3,
        delay: 1.4,
    },
    {
        key: 'down1',
        d: 'M20,80 C25,85 30,88 40,85',
        className: styles.branchOffDown,
        stroke: '#5C4033',
        strokeWidth: 1.6,
        delay: 1.8,
    },
    {
        key: 'down2',
        d: 'M60,50 C63,53 65,58 75,65',
        className: styles.branchOffDown,
        stroke: '#8B4513',
        strokeWidth: 1.4,
        delay: 2.2,
    },
];

const BLOSSOM_DEFS = [
    { x: 20, y: 40, color: 'lightpink', delay: 0 },
    { x: 10, y: 15, color: 'mistyrose', delay: 0.4 },
    { x: 35, y: 35, color: 'lavenderblush', delay: 0.8 },
    { x: 20, y: 20, color: 'peachpuff', delay: 1.2 },
    { x: 56, y: 13, color: 'lightpink', delay: 2.4 },
    { x: 40, y: 85, color: 'peachpuff', delay: 1.6 },
    { x: 74, y: 64, color: 'mistyrose', delay: 2 },
    { x: 95, y: 10, color: 'lightpink', delay: 2.4 },
    { x: 32, y: 70, color: 'lavenderblush', delay: 2.4 },
];

const BlossomLoader: React.FC = () => {
    const petalGroup = useRef<SVGGElement>(null);

    useEffect(() => {
        const spawnPetal = () => {
            if (!petalGroup.current) return;
            const NS = 'http://www.w3.org/2000/svg';
            const c = document.createElementNS(NS, 'circle');
            const x = 15 + Math.random() * 70;
            const y = 5 + Math.random() * 50;
            const r = 1.5 + Math.random() * 1.5;
            c.setAttribute('cx', `${x}`);
            c.setAttribute('cy', `${y}`);
            c.setAttribute('r', `${r}`);
            c.setAttribute('fill', 'pink');
            c.classList.add(styles.fallingPetal);
            petalGroup.current.appendChild(c);
            setTimeout(() => petalGroup.current?.removeChild(c), 6000);
        };

        const interval = setInterval(() => {
            // spawn 2 petals each tick
            spawnPetal();
            spawnPetal();
        }, 700);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* multi‐color spinner */}
                {SPINNER_COLORS.map((color, i) => (
                    <circle
                        key={i}
                        className={styles.spinnerRing}
                        cx="50"
                        cy="50"
                        r={RADIUS}
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: `${SPINNER_SEGMENT} ${CIRCUMFERENCE - SPINNER_SEGMENT}`,
                            strokeDashoffset: -SPINNER_SEGMENT * i,
                        }}
                    />
                ))}

                <g className={styles.shakeGroup}>
                    {/* all branches */}
                    {BRANCH_DEFS.map(({ key, d, className, stroke, strokeWidth, delay }) => (
                        <path
                            key={key}
                            d={d}
                            className={className}
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                            fill="none"
                            style={{ animationDelay: `${delay}s` }}
                        />
                    ))}

                    {/* all blossoms */}
                    {BLOSSOM_DEFS.map(({ x, y, color, delay }, i) => (
                        <g
                            key={i}
                            className={styles.blossom}
                            style={
                                {
                                    '--tx': `${x}px`,
                                    '--ty': `${y}px`,
                                    animationDelay: `${delay}s`,
                                } as React.CSSProperties
                            }
                        >
                            <circle cx="0" cy="-3" r="2.2" fill={color} />
                            <circle cx="2.8" cy="-0.9" r="2.2" fill={color} />
                            <circle cx="1.7" cy="2.4" r="2.2" fill={color} />
                            <circle cx="-1.7" cy="2.4" r="2.2" fill={color} />
                            <circle cx="-2.8" cy="-0.9" r="2.2" fill={color} />
                            <circle cx="-1.7" cy="-0.9" r="2.2" fill={color} />
                        </g>
                    ))}
                </g>

                {/* falling petals */}
                <g ref={petalGroup} />
            </svg>
            <svg>
                <text x="50" y="20" textAnchor="middle" className={styles.loadingLabel}>
                    Loading…
                </text>
            </svg>
        </div>
    );
};

export default BlossomLoader;

// FlexBox.tsx
import type { ReactNode, CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import styles from './FlexBox.module.scss';

type FlexProps = {
    children?: ReactNode;
    className?: string;
    direction?: CSSProperties['flexDirection'];
    justify?: CSSProperties['justifyContent'];
    align?: CSSProperties['alignItems'];
    gap?: CSSProperties['gap'];
    wrap?: CSSProperties['flexWrap'];
};

const flexStyles = css<FlexProps>`
    ${({ direction = 'row' }) => `flex-direction: ${direction};`}
    ${({ justify = 'flex-start' }) => `justify-content: ${justify};`}
  ${({ align = 'flex-start' }) => `align-items: ${align};`}
  ${({ gap = '0rem' }) => `gap: ${gap}rem;`}
  ${({ wrap = 'nowrap' }) => `flex-wrap: ${wrap};`}
`;

const BaseFlex = styled.div.attrs((props: FlexProps) => ({
    className: styles.flexbox + (props.className ? ` ${props.className}` : ''),
}))<FlexProps>`
    ${flexStyles}
`;

export default function FlexBox(props: FlexProps) {
    return <BaseFlex {...props}>{props.children}</BaseFlex>;
}

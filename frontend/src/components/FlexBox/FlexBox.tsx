// FlexBox.tsx
import type { ReactNode, CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import styles from './FlexBox.module.scss';

type FlexProps = {
    children?: ReactNode;
    className?: string;
    fullWidth?: boolean;
    direction?: CSSProperties['flexDirection'];
    justify?: CSSProperties['justifyContent'];
    align?: CSSProperties['alignItems'];
    gap?: CSSProperties['gap'];
    wrap?: CSSProperties['flexWrap'];
    flex?: CSSProperties['flex'];
};

const flexStyles = css<FlexProps>`
    ${({ fullWidth = false }) => `width: ${fullWidth ? '100%' : 'auto'}`};
    ${({ direction = 'row' }) => `flex-direction: ${direction};`}
    ${({ justify = 'flex-start' }) => `justify-content: ${justify};`}
  ${({ align = 'flex-start' }) => `align-items: ${align};`}
  ${({ gap = '0rem' }) => `gap: ${gap}rem;`}
  ${({ wrap = 'nowrap' }) => `flex-wrap: ${wrap};`}
  flex: ${({ flex }) => flex ?? '0 1 auto'};
`;

const BaseFlex = styled.div.attrs((props: FlexProps) => ({
    className: styles.flexbox + (props.className ? ` ${props.className}` : ''),
}))<FlexProps>`
    ${flexStyles}
`;

export default function FlexBox(props: FlexProps) {
    return <BaseFlex {...props}>{props.children}</BaseFlex>;
}

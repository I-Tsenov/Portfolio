// FlexBox.tsx
import type { ReactNode, CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import styles from './FlexBox.module.scss';

// let breakpoints = {
//     sm: '480px',
//     md: '768px',
//     lg: '1024px',
//     xl: '1280px',
// };

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
    //mobile props
    directionMobile?: CSSProperties['flexDirection'];
    justifyMobile?: CSSProperties['justifyContent'];
    alignMobile?: CSSProperties['alignItems'];
    gapMobile?: CSSProperties['gap'];
    wrapMobile?: CSSProperties['flexWrap'];
    flexMobile?: CSSProperties['flex'];
};

const flexStyles = css<FlexProps>`
    ${({ fullWidth = false }) => `width: ${fullWidth ? '100%' : 'auto'}`};
    ${({ direction = 'row' }) => `flex-direction: ${direction};`}
    ${({ justify = 'flex-start' }) => `justify-content: ${justify};`}
  ${({ align = 'flex-start' }) => `align-items: ${align};`}
  ${({ gap = 0 }) => `gap: ${gap}rem;`}
  ${({ wrap = 'nowrap' }) => `flex-wrap: ${wrap};`}
  flex: ${({ flex }) => flex ?? '0 1 auto'};

    /* Mobile overrides via styled-components mixin */
    @media (max-width: 768px) {
        ${({ fullWidth }) => fullWidth && `width: 100%;`}
        ${({ directionMobile }) => directionMobile && `flex-direction: ${directionMobile};`}
    ${({ justifyMobile }) => justifyMobile && `justify-content: ${justifyMobile};`}
    ${({ alignMobile }) => alignMobile && `align-items: ${alignMobile};`}
    ${({ gapMobile = 0 }) => gapMobile && `gap: ${gapMobile}rem;`}
    ${({ wrapMobile }) => wrapMobile && `flex-wrap: ${wrapMobile};`}
    ${({ flexMobile }) => flexMobile && `flex: ${flexMobile};`}
    }
`;

const BaseFlex = styled.div.attrs((props: FlexProps) => ({
    className: styles.flexbox + (props.className ? ` ${props.className}` : ''),
}))<FlexProps>`
    ${flexStyles}
`;

export default function FlexBox(props: FlexProps) {
    return <BaseFlex {...props}>{props.children}</BaseFlex>;
}

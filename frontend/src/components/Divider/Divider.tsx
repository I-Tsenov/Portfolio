import styled from 'styled-components';

type Props = {
    vertical?: boolean;
    thickness?: number;
    color?: string;
};

const DividerWrapper = styled.div<Required<Props>>`
    background-color: ${({ color }) => (color ? color : 'red')};
    ${({ vertical, thickness }) =>
        vertical
            ? `
    width: ${thickness}px;
    height: 100%;
  `
            : `
    width: 100%;
    height: ${thickness}px;
  `}
`;

export default function Divider({ vertical = false, thickness = 1, color = '#ccc' }: Props) {
    return <DividerWrapper vertical={vertical} thickness={thickness} color={color} />;
}

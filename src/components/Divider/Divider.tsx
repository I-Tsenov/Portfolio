// Divider.tsx
import styles from './Divider.module.scss';

type Props = {
    vertical?: boolean;
    thickness?: string;
    color?: string;
}

export default function Divider({ vertical = false, thickness = '1px', color = '#ccc' }: Props) {
    return (
        <div
            className={vertical ? styles.vertical : styles.horizontal}
            style={{
                backgroundColor: color,
                width: vertical ? thickness : '100%',
                height: vertical ? '100%' : thickness,
            }}
        />
    );
}

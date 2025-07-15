import styles from './Badge.module.scss';

interface Props {
    text: string;
    color?: 'primary' | 'success' | 'warning' | 'error';
    className?: string;
}

export default function Badge({ text, color = 'primary', className = '' }: Props) {
    return <span className={`${styles.badge} ${styles[color]} ${className}`}>{text}</span>;
}

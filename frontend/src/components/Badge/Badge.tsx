import styles from './Badge.module.scss';

type Props = {
    text: string;
    color?: 'info' | 'success' | 'warning' | 'error';
    className?: string;
};

export default function Badge({ text, color = 'info', className = '' }: Props) {
    return <span className={`${styles.badge} ${styles[color]} ${className}`}>{text}</span>;
}

// InputField.tsx
import React from 'react';
import FlexBox from '../FlexBox';
import styles from './InputField.module.scss';

type InputFieldProps = {
    id: string;
    name: string;
    label: string;
    type?: 'text' | 'email' | 'textarea';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
    className?: string;
    rows?: number; // only for textarea
    errorMessage?: string;
};

const InputField: React.FC<InputFieldProps> = ({
    id,
    name,
    label,
    type = 'text',
    value,
    onChange,
    required = false,
    className = '',
    rows = 4,
    errorMessage = '',
}) => {
    const hasError = Boolean(errorMessage);

    const baseProps = {
        id,
        name,
        value,
        onChange,
        required,
        'aria-required': required,
        'aria-invalid': hasError,
        className: [styles.input, hasError && styles.error, className].filter(Boolean).join(' '),
    } as const;

    return (
        <div className={styles.wrapper}>
            <FlexBox align="center" justify="space-between" gap={1} className={styles.labelGroup}>
                <label htmlFor={id}>{label}</label>
                {hasError && (
                    <span className={styles.helperText} role="alert">
                        {errorMessage}
                    </span>
                )}
            </FlexBox>

            {type === 'textarea' ? <textarea {...baseProps} rows={rows} /> : <input {...baseProps} type={type} />}
        </div>
    );
};

export default InputField;

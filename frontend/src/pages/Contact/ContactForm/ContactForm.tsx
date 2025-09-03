import React, { useState, useEffect, useMemo } from 'react';
import styles from './ContactForm.module.scss';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { sendMessage, resetContactState } from '@src/features/ContactForm/contactSlice';
import useDebounce from '@src/hooks/useDebounce';
import InputField from '@src/components/InputField';
import Button from '@src/components/Button';
import BlossomLoader from '@src/components/BlossomLoader';
import Toast, { type ToastVariant } from '@src/components/Toast';

const STORAGE_KEY = 'contactFormData';
const fields = ['name', 'email', 'message'] as const;
type Field = (typeof fields)[number];
type FormData = Record<Field, string>;
type ErrorState = Record<Field, string>;

const initialFormData = Object.fromEntries(fields.map((f) => [f, ''])) as FormData;
const initialErrors = Object.fromEntries(fields.map((f) => [f, ''])) as ErrorState;

function validateField(field: Field, value: string): string {
    const v = value.trim();
    switch (field) {
        case 'name':
            return v ? '' : 'Please enter your name.';
        case 'email':
            if (!v) return 'Please enter your email.';
            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v) ? '' : 'Please enter a valid email address.';
        case 'message':
            return v ? '' : 'Please enter your message.';
        default:
            return '';
    }
}

const ContactForm: React.FC<{ className?: string }> = ({ className }) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((s) => s.contact.status);
    const isLoading = status === 'loading';

    const loadSaved = (): FormData => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw) as FormData;
        } catch (err) {
            console.log(err);
        }
        return initialFormData;
    };

    const [formData, setFormData] = useState<FormData>(loadSaved());
    const [errors, setErrors] = useState<ErrorState>(initialErrors);
    const [submitted, setSubmitted] = useState(false);
    const [toast, setToast] = useState<{ message: string; variant: ToastVariant } | null>(null);

    const debouncedData = useDebounce(formData, 600);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(debouncedData));
        } catch {
            console.log('Failed to save form data to localStorage');
        }
    }, [debouncedData]);

    useEffect(() => {
        if (!submitted) return;

        const newErrs: Partial<ErrorState> = {};
        fields.forEach((f) => {
            const msg = validateField(f, debouncedData[f]);
            if (msg) newErrs[f] = msg;
        });
        if (Object.keys(newErrs).length) {
            setErrors((prev) => ({ ...prev, ...newErrs }));
        }
    }, [debouncedData, submitted]);

    // reset contact state after success or failure
    useEffect(() => {
        if (status === 'succeeded' || status === 'failed') {
            const timer = setTimeout(() => dispatch(resetContactState()), 3000);
            return () => clearTimeout(timer);
        }
    }, [status, dispatch]);

    const isFormValid = useMemo(() => fields.every((f) => validateField(f, formData[f]) === ''), [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as { name: Field; value: string };
        setFormData((fd) => ({ ...fd, [name]: value }));

        if (submitted) {
            setErrors((err) => ({ ...err, [name]: validateField(name, value) }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        // sync‐validate all fields
        const syncErrors: Partial<ErrorState> = {};
        fields.forEach((f) => {
            const msg = validateField(f, formData[f]);
            if (msg) syncErrors[f] = msg;
        });

        setErrors({ ...initialErrors, ...syncErrors });
        if (Object.keys(syncErrors).length) return;

        try {
            await dispatch(sendMessage(formData)).unwrap();
            // clear form (and thus localStorage via effect)
            setFormData(initialFormData);
            setErrors(initialErrors);
            setSubmitted(false);
            setToast({ message: 'Your message has been sent successfully!', variant: 'success' });
        } catch {
            setToast({ message: 'Message failed to send. Please try again.', variant: 'error' });
        }
    };

    return (
        <>
            <form
                className={`${styles.form} ${className || ''}`}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact Me Form"
            >
                {fields.map((f) => (
                    <InputField
                        key={f}
                        id={f}
                        name={f}
                        label={f.charAt(0).toUpperCase() + f.slice(1)}
                        type={f === 'message' ? 'textarea' : (f as 'text' | 'email')}
                        value={formData[f]}
                        onChange={handleChange}
                        required
                        errorMessage={errors[f]}
                    />
                ))}

                <Button type="submit" variant="primary" disabled={isLoading || !isFormValid}>
                    {isLoading ? 'Sending...' : 'Send'}
                </Button>
            </form>

            {isLoading && <BlossomLoader loading={true} />}

            {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
        </>
    );
};

export default ContactForm;

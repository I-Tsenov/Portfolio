// ContactForm.tsx
import React, { useState, useEffect } from 'react';
import styles from './ContactForm.module.scss';
import { useAppDispatch } from '@src/hooks/redux';
import { sendMessage } from '@src/features/ContactForm/contactSlice';
import useDebounce from '@src/hooks/useDebounce';
import Button from '@src/components/Button';
import InputField from '@src/components/InputField';
import Toast, { type ToastVariant } from '@src/components/Toast';

type ContactFormProps = {
    className?: string;
};

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errorState, setErrorState] = useState<Record<string, string>>({});
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    const [toast, setToast] = useState<{
        message: string;
        variant: ToastVariant;
    } | null>(null);

    const debouncedFormData = useDebounce(formData, 600);

    const validateField = (name: string, value: string): string => {
        const trimmed = value.trim();
        switch (name) {
            case 'name':
                return trimmed ? '' : 'Please enter your name.';
            case 'email': {
                if (!trimmed) return 'Please enter your email.';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
                return emailRegex.test(value) ? '' : 'Please enter a valid email address.';
            }
            case 'message':
                return trimmed ? '' : 'Please enter your message.';
            default:
                return '';
        }
    };

    // Re-validate only the fields the user has touched, after debounce
    useEffect(() => {
        const updates: Record<string, string> = {};

        Object.entries(debouncedFormData).forEach(([key, val]) => {
            if (touchedFields[key]) {
                updates[key] = validateField(key, val);
            }
        });

        if (Object.keys(updates).length > 0) {
            setErrorState((prev) => ({ ...prev, ...updates }));
        }
    }, [debouncedFormData, touchedFields]);

    // Just update formData and mark touched — no immediate validation here
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (!touchedFields[name]) {
            setTouchedFields((prev) => ({ ...prev, [name]: true }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Full sync validation
        const syncErrors: Record<string, string> = {};
        Object.entries(formData).forEach(([key, val]) => {
            const msg = validateField(key, val);
            if (msg) syncErrors[key] = msg;
        });
        setErrorState(syncErrors);

        // Mark all as touched
        setTouchedFields(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

        try {
            await dispatch(sendMessage(formData)).unwrap();
            // reset form
            setFormData({ name: '', email: '', message: '' });
            setErrorState({});
            setTouchedFields({});
            setToast({
                message: 'Your message has been sent successfully!',
                variant: 'success',
            });
        } catch {
            setToast({
                message: 'Message failed to send. Please try again.',
                variant: 'error',
            });
        }
    };

    return (
        <>
            <form
                className={`${styles.form} ${className ?? ''}`}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact Me Form"
            >
                <InputField
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    errorMessage={errorState.name}
                />
                <InputField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    errorMessage={errorState.email}
                />
                <InputField
                    id="message"
                    name="message"
                    label="Message"
                    type="textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    errorMessage={errorState.message}
                />

                <Button type="submit" variant="primary">
                    Send
                </Button>
            </form>
            {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
        </>
    );
};

export default ContactForm;

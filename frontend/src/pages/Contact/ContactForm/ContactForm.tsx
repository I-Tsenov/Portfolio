// ContactForm.tsx
import styles from './ContactForm.module.scss';
import { useAppDispatch } from '@src/hooks/redux';
import { sendMessage } from '@features/ContactForm/contactSlice';
import { useState } from 'react';
import Button from '@src/components/Button';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Basic frontend validation
        if (!formData.name || !formData.email.includes('@') || !formData.message) {
            alert('Please fill out all fields correctly.');
            return;
        }

        dispatch(sendMessage(formData));
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Contact Me Form">
            <label htmlFor="name">Name</label>
            <input
                id="name"
                name="name"
                type="text"
                required
                aria-required="true"
                aria-invalid={formData.name.trim() === ''}
                value={formData.name}
                onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={!formData.email.includes('@')}
                value={formData.email}
                onChange={handleChange}
            />

            <label htmlFor="message">Message</label>
            <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                aria-invalid={formData.message.trim() === ''}
                value={formData.message}
                onChange={handleChange}
            ></textarea>

            <Button type="submit" variant="primary">
                Send
            </Button>
        </form>
    );
};

export default ContactForm;

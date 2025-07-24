import React from 'react';
import ContactForm from './ContactForm';
import styles from './Contact.module.scss';

const Contact: React.FC = () => (
    <section className={styles.wrapper}>
        {/* Background image layer */}
        <section className={styles.imageLayer} />
        {/* Content layer */}
        <section className={styles.contentLayer}>
            <ContactForm />
        </section>
    </section>
);

export default Contact;

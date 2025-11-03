import React from 'react';
import ContactForm from './ContactForm';
import FlexBox from '@src/components/FlexBox';
import LinkWrapper from '@src/components/LinkWrapper';
import { ReactComponent as LinkedinIcon } from '@assets/linkedin_icon.svg';
import { ReactComponent as GithubIcon } from '@assets/github_icon.svg';
import { ReactComponent as InstagramIcon } from '@assets/instagram_icon.svg';
import { ReactComponent as FacebookIcon } from '@assets/facebook_icon.svg';
import styles from './Contact.module.scss';

const Contact: React.FC = () => (
    <section className={styles.wrapper}>
        {/* Background image layer */}
        <section className={styles.imageLayer} />
        {/* Content layer */}
        <section className={styles.contentLayer}>
            <FlexBox gap={2.5} justify="center" align="center" className={styles.iconWrapper}>
                <LinkWrapper href="https://www.linkedin.com/in/ivan-tsenov" target="_blank" ariaLabel="GitHub Profile">
                    <LinkedinIcon />
                </LinkWrapper>
                <LinkWrapper href="https://github.com/i-tsenov" target="_blank" ariaLabel="GitHub Profile">
                    <GithubIcon />
                </LinkWrapper>
                <LinkWrapper href="https://www.instagram.com/tobetsenov/" target="_blank" ariaLabel="Instagram Profile">
                    <InstagramIcon />
                </LinkWrapper>
                <LinkWrapper
                    href="https://www.facebook.com/ivan.tsenov.7/"
                    target="_blank"
                    ariaLabel="Facebook Profile"
                >
                    <FacebookIcon />
                </LinkWrapper>
            </FlexBox>
            <span>or contact me by sending a message below</span>
            <ContactForm className={styles.compactForm} />
        </section>
    </section>
);

export default Contact;

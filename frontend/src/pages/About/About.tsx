import React from 'react';
import styles from './About.module.scss';

type SectionProps = {
    title: string;
    children: React.ReactNode;
    reverse?: boolean;
};

const Section: React.FC<SectionProps> = ({ title, children, reverse = false }) => (
    <div className={`${styles.section} ${reverse ? styles.reverse : ''}`}>
        <div className={styles.content}>
            <h2>{title}</h2>
            <p>{children}</p>
        </div>
        <div className={styles.image} />
    </div>
);

const AboutMe: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.intro}>
                <h1>Let's learn more about who I am</h1>
                <p>A developer who thrives on change.</p>
            </div>

            <Section title="Intro">
                My name is Ivan Tsenov, 33 years old based in Sofia, Bulgaria. Thank you for being part of my journey. I
                have five years of development experience, three of which specializing in front-end software. React is
                my framework of choice while having strong foundation in JavaScript, HTML, and CSS.
            </Section>
            <Section title="Personality" reverse>
                I like to think of myself as open-minded, curious and creative. My perfectionism ensures attention to
                detail, yet I know and tame the downsides of it daiy, prioritizing momentum and collaboration when
                needed. I'm happy to “fail forward” if it means learning something new.
            </Section>
            <Section title="Hobbies">
                In my free time, I enjoy outdoor adventures with friends and my spirited blue-eyed husky. I'm always up
                for new challenges—whether it's a bouldering session, an airsoft skirmish, or a multi-day trek. In 2020,
                I completed the Kom-Emine trail, one of the most memorable experiences of my life.
            </Section>
            <Section title="Short History" reverse>
                I've worked various jobs. Starting as barista, store employee, to engraver for an year in Leeds, bycicle
                mechanic, sales-consultant and finally web developer. Even though I liked many aspects of my previous
                endevours they became stale at a point and the reason to choose development is the shifting nature of
                it. Every day provides new challenges and opportunities. This is where I invest myself.
            </Section>
        </div>
    );
};

export default AboutMe;

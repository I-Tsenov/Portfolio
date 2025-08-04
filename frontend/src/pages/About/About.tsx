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
                <p>A developer who always finds a way — someone who thrives on change.</p>
            </div>

            <Section title="Development is everchanging. Main reason to get into it.">
                As a person I am not doing great when it comes to routines, I get bored after a while. My desire and
                curiosity to learn and grow is what drives the bus. Not afraid to look stupid if it will get me the
                knowledge, fail forward as they say. Perfectionism is my best and worst character trait. If you want
                something pixel perfect, you got it. I have 5 years of experience in software development, 3 of them
                professionally working as front-end developer at ISI Emerging Markets.
            </Section>

            <Section title="Hobbies" reverse>
                Free time I spend with my friends and dog, blue-eyed mischievous husky. Occasionally go to bouldering
                and airsoft. Love hiking and trekking, in 2020 I did Kom-Emine route and it's one of the best
                experiences I've had in my life.
            </Section>

            <Section title="Personal History">
                I've worked many jobs. Starting as barista then grocery store employee, to engraver for an year in
                Leeds, England, bycicle mechanic, sales-consultant and finally web developer. Even though I liked many
                aspects of my previous jobs they became stale at a point and the reason to choose development is the
                everchanging nature of it. Not a day is the same. It doesn't get boring, it keeps giving you challenges
                and opportunities. This is where I invest myself, my career.
            </Section>
        </div>
    );
};

export default AboutMe;

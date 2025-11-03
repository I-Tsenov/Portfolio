import React from 'react';
import styles from './About.module.scss';
import introImgDark from '@assets/intro_panel_dark.png';
import introImgLight from '@assets/intro_panel_light.png';
import personalityImg from '@assets/personality_panel.png';
import hobbiesImg from '@assets/hobby_panels.png';
import historyImg from '@assets/history_panel.png';
import { useAppSelector } from '@src/hooks/redux';
import type { RootState } from '@store/store';

type SectionProps = {
    title: string;
    children: React.ReactNode;
    reverse?: boolean;
    image: string;
};

const Section: React.FC<SectionProps> = ({ title, children, reverse = false, image }) => (
    <div className={`${styles.section} ${reverse ? styles.reverse : ''}`}>
        <div className={styles.content}>
            <h2>{title}</h2>
            <p>{children}</p>
        </div>
        <div className={styles.image} style={{ backgroundImage: `url(${image})` }} />
    </div>
);

const AboutMe: React.FC = () => {
    const mode = useAppSelector((state: RootState) => state.theme.mode);

    return (
        <div className={styles.container}>
            <div className={styles.intro}>
                <h1>Let's learn more about who I am</h1>
                <p>A developer who thrives on change.</p>
            </div>

            <Section title="Introduction" image={mode === 'dark' ? introImgDark : introImgLight}>
                My name is Ivan Tsenov, 33 years old developer based in Sofia, Bulgaria. Thank you for being part of my journey. I
                have five years of programming experience, three of which specializing in front-end software. React is
                my framework of choice while having strong foundation in JavaScript, HTML, and CSS.
            </Section>
            <Section title="Personality" image={personalityImg} reverse>
                I like to think of myself as open-minded, curious and creative. My perfectionism ensures attention to
                detail, yet I recognize and tame the downsides of it daily, prioritizing momentum and collaboration when
                needed. I'm happy to “fail forward” if it means learning something new.
            </Section>
            <Section title="Hobbies" image={hobbiesImg}>
                In my free time, I enjoy outdoor adventures with friends and my spirited blue-eyed husky. I'm always up
                for new challenges—whether it's a bouldering session, an airsoft skirmish, or a multi-day trek. In 2020,
                I completed the Kom-Emine trail, one of the most memorable experiences of my life.
            </Section>
            <Section title="Short History" image={historyImg} reverse>
                I've worked various jobs. Starting as barista, store employee, to engraver for an year in Leeds, bycicle
                mechanic, sales-consultant and finally web developer. Even though I liked many aspects of my previous
                endevours they became stale at a point and the reason to choose development is the shifting nature of
                it. Every day provides new challenges and opportunities. This is where I invest myself.
            </Section>
        </div>
    );
};

export default AboutMe;

import React from 'react';
import { Link } from 'react-router-dom';
import FlexBox from '@src/components/FlexBox';
import myImage from '@assets/face_abstract_web.png';
import BubbleFrame from '@src/components/BubbleFrame';
import IconStack from './IconStack';
import styles from './Home.module.scss';

const Home: React.FC = () => {
    return (
        <div className={styles.mainWrapper}>
            <FlexBox align="start" direction="column" gap={4} directionMobile="column" gapMobile={2}>
                <section className={styles.introduction}>
                    <h1 className={styles.title}>Front-end React Developer</h1>
                    <p>Hi! I am Ivan Tsenov. </p>
                    <p>Front-end developer based in Sofia, Bulgaria.</p>
                    <p>Welcome to my corner of the web.</p>
                    <Link key={'contact'} to={'/contact'} className={styles.redirect}>
                        Reach me
                    </Link>
                </section>
                <IconStack />
            </FlexBox>
            <BubbleFrame src={myImage} alt="Picture of an eye" className="bubbleWrap" />
        </div>
    );
};

export default Home;

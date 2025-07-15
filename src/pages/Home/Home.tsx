import Button from '@components/Button/Button';
import styles from './Home.module.scss';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div className={styles.mainWrapper}>
            <h1>This is a website</h1>
            <p>front-end developerment by humans</p>
            <div className={styles.btnWrapper}>
                <Button variant="primary" onClick={() => alert('Button clicked!')}>
                    Primary
                </Button>
                <Button variant="secondary" onClick={() => alert('Button clicked!')}>
                    Secondary
                </Button>
                <Button variant="ghost" onClick={() => alert('Button clicked!')}>
                    Ghost
                </Button>
                <Button variant="primary" disabled onClick={() => alert('Button clicked!')}>
                    Disabled
                </Button>
            </div>
        </div>
    );
};

export default Home;

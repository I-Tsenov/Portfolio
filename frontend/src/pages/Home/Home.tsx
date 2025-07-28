import Button from '@src/components/Button/Button';
import styles from './Home.module.scss';
import React from 'react';
import Loader from '@src/components/Loader';
import Toast from '@src/components/Toast';
import Badge from '@src/components/Badge';

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
            <div className={styles.btnWrapper}>
                <Badge text="info" color="info" />
                <Badge text="success" color="success" />
                <Badge text="warning" color="warning" />
                <Badge text="error" color="error" />
            </div>
            <Loader />
            <Toast message="This is a toast notification!" duration={3000} onClose={() => {}} />
        </div>
    );
};

export default Home;

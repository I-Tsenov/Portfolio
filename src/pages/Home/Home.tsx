import Button from '@components/Button/Button';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div style={{ height: '100%', padding: '2rem', textAlign: 'center' }}>
            <h1>This is my website</h1>
            <p>front-end developerment by humans</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '1rem' }}>
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

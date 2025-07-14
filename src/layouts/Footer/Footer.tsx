import React from 'react';

const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem', padding: '0 1rem', background: '#eee', color: '#666'}}>
            © {year} Front-end developerment by human efforts
        </footer>
    );
};

export default Footer;
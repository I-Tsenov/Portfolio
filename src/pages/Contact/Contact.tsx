import React from 'react';
import faceAbstract from '@assets/face_abstract.png';

const contacts = [
    { name: 'Alice Johnson', email: 'alice@example.com', phone: '555-1234' },
    { name: 'Bob Smith', email: 'bob@example.com', phone: '555-5678' },
    { name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-9012' },
];

const Contact: React.FC = () => (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* Background image layer */}
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '70%',
                height: '100%',
                backgroundImage: `url(${faceAbstract})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 0,
            }}
        />

        {/* Content layer */}
        <div
            style={{
                position: 'relative',
                top: 0,
                height: '100%',
                left: '70%',
                zIndex: 1,
                maxWidth: 600,
                padding: '2rem',
                backgroundColor: 'rgba(255,255,255,0.85)', // Optional: adds contrast
            }}
        >
            <h1>Contacts</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '3px solid #ccc', textAlign: 'center' }}>Name</th>
                        <th style={{ borderBottom: '3px solid #ccc', textAlign: 'center' }}>Email</th>
                        <th style={{ borderBottom: '3px solid #ccc', textAlign: 'center' }}>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, idx) => (
                        <tr key={idx}>
                            <td style={{ padding: '0.5rem 0' }}>{contact.name}</td>
                            <td style={{ padding: '0.5rem 0' }}>{contact.email}</td>
                            <td style={{ padding: '0.5rem 0' }}>{contact.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default Contact;

import React from "react";

const contacts = [
    { name: "Alice Johnson", email: "alice@example.com", phone: "555-1234" },
    { name: "Bob Smith", email: "bob@example.com", phone: "555-5678" },
    { name: "Charlie Brown", email: "charlie@example.com", phone: "555-9012" },
];

const Contact: React.FC = () => (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
        <h1>Contacts</h1>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th style={{ borderBottom: "3px solid #ccc", textAlign: "center" }}>Name</th>
                    <th style={{ borderBottom: "3px solid #ccc", textAlign: "center" }}>Email</th>
                    <th style={{ borderBottom: "3px solid #ccc", textAlign: "center" }}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, idx) => (
                    <tr key={idx}>
                        <td style={{ padding: "0.5rem 0" }}>{contact.name}</td>
                        <td style={{ padding: "0.5rem 0" }}>{contact.email}</td>
                        <td style={{ padding: "0.5rem 0" }}>{contact.phone}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default Contact;
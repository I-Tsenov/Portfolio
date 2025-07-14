import React from "react";

const NotFound: React.FC = () => {
    return (
        <div
            style={{
                height: '100%',
                background: "linear-gradient(90deg,rgb(26, 29, 29) 0%, rgb(10, 14, 14) 38%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
            }}
        >
            <h1
                style={{
                    fontSize: "8rem",
                    fontWeight: 900,
                    letterSpacing: "0.1em",
                    margin: 0,
                    background: "linear-gradient(90deg, #ff512f, #dd2476)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                404
            </h1>
            <h2 style={{ fontSize: "2.5rem", margin: "0.5em 0" }}>
                Page Not Found
            </h2>
            <p style={{ fontSize: "1.2rem", color: "#ccc", marginBottom: "2em" }}>
                Oops! The page you are looking for does not exist.
            </p>
            <a
                href="/"
                style={{
                    padding: "0.75em 2em",
                    background: "linear-gradient(90deg, #ff512f, #dd2476)",
                    color: "#fff",
                    borderRadius: "30px",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    boxShadow: "0 4px 20px rgba(221,36,118,0.2)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseOver={e => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                        "0 8px 32px rgba(221,36,118,0.3)";
                }}
                onMouseOut={e => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                        "0 4px 20px rgba(221,36,118,0.2)";
                }}
            >
                Go Home
            </a>
        </div>
    );
};

export default NotFound;
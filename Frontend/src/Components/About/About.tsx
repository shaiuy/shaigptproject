import "./About.css";

export function About() {
    return (
        <div className="about-page">

            <header className="about-hero">
                <h1>About ShaiGPT</h1>
                <p className="about-hero-lead">
                    An AI Chat Application built with React, TypeScript,
                    FastAPI, and MySQL.
                </p>
            </header>

            <div className="about-grid">

                <section className="about-card about-card--wide">
                    <h2>Project Overview</h2>
                    <p>
                        The application allows users to chat with an AI assistant,
                        maintain conversation history, and start new conversations.
                    </p>
                </section>

                <section className="about-card">
                    <h2>Technologies Used</h2>
                    <ul className="tech-list">
                        <li>React</li>
                        <li>TypeScript</li>
                        <li>FastAPI</li>
                        <li>Python</li>
                        <li>MySQL</li>
                        <li>OpenAI API</li>
                    </ul>
                </section>

                <section className="about-card about-card--developer">
                    <h2>Developer</h2>

                    <div className="developer-info">
                        <img
                            className="developer-photo"
                            src="/images/shai-akoka.png"
                            alt="Shai Akoka"
                        />

                        <p className="developer-name">
                            Shai Akoka
                        </p>

                        <p className="developer-description">
                            Software Engineering student with experience in building web applications
                            using modern frontend and backend technologies.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}
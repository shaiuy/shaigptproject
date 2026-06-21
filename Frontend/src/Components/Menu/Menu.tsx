import { NavLink } from "react-router-dom";
import "./Menu.css";

// Top navigation bar
export function Menu() {
    return (
        <nav className="nav-bar">
            <NavLink to="/chat" className="nav-brand">
                <span className="nav-brand-icon">S</span>
                <span className="nav-brand-text">
                    Shai<span>GPT</span>
                </span>
            </NavLink>
            <div className="nav-links">
                <NavLink
                    to="/chat"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Chat
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    About
                </NavLink>
            </div>
        </nav>
    );
}

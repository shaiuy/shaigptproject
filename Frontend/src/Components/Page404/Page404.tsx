import { Link } from "react-router-dom";
import "./Page404.css";

// Page shown for unknown routes
export function Page404() {
    return (
        <div className="page-404">
            <h1>404 Page Not Found</h1>
            <Link to="/chat" className="page-404-btn">
                Back to Chat
            </Link>
        </div>
    );
}

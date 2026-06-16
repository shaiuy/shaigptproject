import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout() {
    return (
        <div className="layout">
            <Menu />
            <main className="main-content">
                <Routing />
            </main>
            <footer className="site-footer">
                <div className="site-footer-inner">
                    <p>ShaiGPT &mdash; AI Chat Application &copy; 2026 Shai Akoka</p>
                </div>
            </footer>
        </div>
    );
}

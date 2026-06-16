import { Navigate, Route, Routes } from "react-router-dom";
import { Chat } from "../Chat/Chat";
import { About } from "../About/About";
import { Page404 } from "../Page404/Page404";
import type { JSX } from "react/jsx-runtime";

export function Routing(): JSX.Element {

    return (
        <Routes>

            <Route
                path="/"
                element={<Navigate to="/chat" />}
            />

            <Route
                path="/chat"
                element={<Chat />}
            />

            <Route
                path="/about"
                element={<About />}
            />

            <Route
                path="*"
                element={<Page404 />}
            />

        </Routes>
    );
}
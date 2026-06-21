import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
import "./index.css";

// App entry point
ReactDOM.createRoot(
    document.getElementById("root")!
).render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
);

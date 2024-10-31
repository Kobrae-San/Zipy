import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import App from "@/App";
import { Register } from "@/pages/Auth/Register.tsx";
import History from "@/pages/History.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/history",
        element: <History />
    }
]);

export default router;
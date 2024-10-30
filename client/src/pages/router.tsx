import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import App from "@/App";
import { Register } from "@/pages/Auth/Register.tsx";

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
    }
]);

export default router;
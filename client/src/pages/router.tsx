import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import { Register } from "@/pages/Auth/Register.tsx";
import History from "@/pages/History.tsx";
import Home from "@/pages/Home.tsx";
import Nav from "@/components/Nav.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";

const Layout = () => {
    return (
        <>
            <Nav />
            <Outlet />
            <Toaster />
        </>
    );
};


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/history",
                element: <History />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default router;
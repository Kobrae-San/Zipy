import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import { LogOut, Upload, History, User, GalleryVerticalEnd } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

export default function Nav() {
    // const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await fetch("http://127.0.0.1:3000/api/auth/logout",  {
            credentials: 'include'
        });
        navigate('/login');
    };

    // const isActive = (path: string) => {
    //     return location.pathname === path;
    // };

    return (
        <nav className="border-b bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                            Zipy
                        </Link>
                    </div>

                    {/*<div className="flex items-center gap-4">*/}
                    {/*    {isAuthenticated ? (*/}
                    {/*        <>*/}
                    {/*            <Button*/}
                    {/*                variant={isActive('/') ? "default" : "ghost"}*/}
                    {/*                className="flex items-center gap-2"*/}
                    {/*                onClick={() => navigate('/')}*/}
                    {/*            >*/}
                    {/*                <Upload className="h-4 w-4" />*/}
                    {/*                Upload*/}
                    {/*            </Button>*/}

                    {/*            <Button*/}
                    {/*                variant={isActive('/history') ? "default" : "ghost"}*/}
                    {/*                className="flex items-center gap-2"*/}
                    {/*                onClick={() => navigate('/history')}*/}
                    {/*            >*/}
                    {/*                <History className="h-4 w-4" />*/}
                    {/*                History*/}
                    {/*            </Button>*/}

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-2"
                                        >
                                            <User className="h-4 w-4" />
                                            {/*{user?.nickname || 'User'}*/}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            onClick={() => {navigate("/history")}}
                                        >
                                            <GalleryVerticalEnd className="h-4 w-4 mr-2"/>
                                            History
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-600 cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            {/*</>*/}
                        {/*) : (*/}
                        {/*    <>*/}
                        {/*        <Button*/}
                        {/*            variant={isActive('/login') ? "default" : "ghost"}*/}
                        {/*            className="flex items-center gap-2"*/}
                        {/*            onClick={() => navigate('/login')}*/}
                        {/*        >*/}
                        {/*            Login*/}
                        {/*        </Button>*/}
                        {/*        <Button*/}
                        {/*            variant={isActive('/register') ? "default" : "ghost"}*/}
                        {/*            className="flex items-center gap-2"*/}
                        {/*            onClick={() => navigate('/register')}*/}
                        {/*        >*/}
                        {/*            Register*/}
                        {/*        </Button>*/}
                        {/*    </>*/}
                        {/*)}*/}
                    {/*</div>*/}
                </div>
            </div>
        </nav>
    );
}
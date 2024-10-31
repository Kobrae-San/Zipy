import './App.css';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import FileUpload from "@/components/FileUpload.tsx";
import { useEffect } from "react";

function App() {
    let isAuthenticated: boolean;
    useEffect(() => {
        const isLogin = async () => {
                const response = await fetch("http://localhost:3000/api/auth/login", {
                    method: "GET",
                    credentials: 'include'
                });
                if (response.status === 200) {
                    return isAuthenticated = true;
                }
                if (response.status === 401) {
                    return isAuthenticated = false;
                }
        };
        isLogin();
    }, []);
    return (
        <div className="container mx-auto p-8 max-w-4xl text-center">
            <nav className="border-b bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-2xl font-bold">
                                Zipy
                            </Link>
                        </div>
                        <div className="flex gap-4">
                            <Link to="/login">
                                <Button variant="link">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="link">Register</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <Card className="w-full">
                <CardContent className="pt-6">
                    <FileUpload isAuthenticated={isAuthenticated} />
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
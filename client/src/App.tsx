import './App.css';
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

function App() {
    return (
        <div className="container mx-auto p-8 max-w-4xl text-center">
            <nav className="border-b bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-xl font-bold">
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
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
                    >
                        <UploadCloud className="mx-auto mb-4 text-gray-400" size={48}/>
                        <div className="text-lg text-gray-600">
                            Drag and drop files here or{' '}
                            <span className="text-blue-500 hover:text-blue-600">browse</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Supported files: ZIP, RAR, 7Z
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
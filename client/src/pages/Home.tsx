import { Card, CardContent } from "@/components/ui/card";
import FileUpload from "@/components/FileUpload.tsx";
import { useEffect } from "react";

export default function Home() {
    let isAuthenticated: boolean = true;
    // useEffect(() => {
    //     const isLogin = async () => {
    //         const response = await fetch("http://127.0.0.1:3000/api/auth/login", {
    //             method: "GET",
    //             credentials: 'include'
    //         });
    //         if (response.status === 200) {
    //             return isAuthenticated = true;
    //         }
    //         if (response.status === 401) {
    //             return isAuthenticated = false;
    //         }
    //     };
    //     isLogin();
    // }, []);
    return (
        <div className="container mx-auto p-8 max-w-4xl text-center">
            <Card className="w-full">
                <CardContent className="pt-6">
                    <FileUpload isAuthenticated={isAuthenticated} />
                </CardContent>
            </Card>
        </div>
    );
}

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { toast } from "@/hooks/use-toast.ts";

export default function LoginForm() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ nickname, password }),
            });

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    description: "Login failed",
                })
                return;
            }

            toast({
                className: "bg-green-500 text-white",
                description: "Login successful",
            })
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="nickname">Nickname</Label>
                        <Input
                            id="nickname"
                            type="text"
                            placeholder="Enter your nickname"
                            onChange={(e) => setNickname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
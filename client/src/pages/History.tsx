import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast.ts";
import HistoryList from "@/components/HistoryList.tsx";

export default function History() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:3000/api/private/history", {
                    method: "GET",
                    credentials: 'include'
                });

                if (response.status === 401) {
                    toast({
                        variant: "destructive",
                        description: "Invalid token",
                    })
                    navigate('/login');
                }

                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="container mx-auto p-8 max-w-4xl text-center">
            <HistoryList/>
        </div>
    )
}
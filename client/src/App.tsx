import './App.css';
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

function App() {
    return (
        <div className="container mx-auto p-8 max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-2">Zipy</h1>
            <p className="text-gray-600 mb-8">A simple zip file manager</p>

            <Card className="w-full">
                <CardContent className="pt-6">
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
                    >
                        <UploadCloud className="mx-auto mb-4 text-gray-400" size={48} />
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
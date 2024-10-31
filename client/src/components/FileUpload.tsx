import React, { useCallback, useState } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast.ts";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";

interface FileUploadProps {
    isAuthenticated: boolean;
}

export default function FileUpload({ isAuthenticated }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();

    const handleFile = async (file: File) => {
        if (file.size > 2 * 1024 * 1024 * 1024) {
            toast({
                description: "File size exceeds 2GB limit.",
                variant: "destructive"
            })
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1/api/private/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            toast({
                description: "File uploaded successfully!",
                className: 'bg-green-500 text-white',
            })
        } catch (err) {
            toast({
                description: "Failed to upload file. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsUploading(false);
        }
    };

    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setShowAuthModal(true);
            return;
        }
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (!isAuthenticated) {
            setShowAuthModal(true);
            return;
        }

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    }, []);

    const onClick = useCallback(() => {
        if (!isAuthenticated) {
            setShowAuthModal(true);
            return;
        }
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                handleFile(target.files[0]);
            }
        };
        input.click();
    }, [isUploading, isDragging]);

    return (
        <div>
                <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer relative
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          `}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={onClick}
                >
                    {isUploading ? (
                        <div>
                            <Loader2 className="mx-auto mb-4 text-blue-500 animate-spin" size={48} />
                            <div className="text-lg text-gray-600">Uploading...</div>
                        </div>
                    ) : (
                        <>
                            <UploadCloud
                                className={`mx-auto mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
                                size={48}
                            />
                            <div className="text-lg text-gray-600">
                                Drag and drop your files here or{' '}
                                <span className="text-blue-500 hover:text-blue-600">browse</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                All file types are supported (max 2GB)
                            </p>
                        </>
                    )}
                </div>

            <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Authentication Required</DialogTitle>
                        <DialogDescription>
                            Please log in or create an account to upload files.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 mt-4">
                        <Button
                            onClick={() => navigate('/login')}
                            className="w-full"
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() => navigate('/register')}
                            variant="outline"
                            className="w-full"
                        >
                            Create Account
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};


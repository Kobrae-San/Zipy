import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/hooks/context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, File, Share, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface FileRecord {
  file_name: string;
  file_size: number;
  mime_type: string;
  file_data: Blob;
  id: number;
}

function formatFileSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

function getFileIcon(mimeType: string) {
  return <File className="w-4 h-4" />;
}

export default function HistoryList() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useContext(UserContext);

  async function handleShare(fileId: number) {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/private/share/${fileId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate share link");
      }

      const result = await response.json();
      setShareLink(result.content);

      if (shareLink) {
        await navigator.clipboard.writeText(
          `http://localhost:4124/download/${shareLink}`
        );
        toast({
          title: "Link copied to clipboard",
          className: "bg-green-500 text-white",
        });
      }
    } catch (error) {
      console.error("Error while trying to generate share link:", error);
    }
  }

  async function getFilesHistory() {
    const response = await fetch(
      `http://127.0.0.1:3000/api/private/history/${userId}`,
      {
        credentials: "include",
      }
    );

    const result = await response.json();
    setFiles(result.content);
  }

  async function handleDownload(fileId: number) {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/private/download/${fileId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        response.headers.get("Content-Disposition")?.split("filename=")[1] ||
        "download";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  }

  const handleDelete = async (fileId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/private/file/${fileId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      getFilesHistory();

      toast({
        description: "File deleted successfully",
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </CardContent>
      </Card>
    );
  }

  useEffect(() => {
    getFilesHistory();
  }, [files]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>File History</CardTitle>
      </CardHeader>
      <CardContent>
        {files === undefined || files.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No files uploaded yet
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead className="w-24">Type</TableHead>
                <TableHead className="w-24 text-left">Size</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.mime_type)}
                      {file.file_name}
                    </div>
                  </TableCell>
                  <TableCell className="text-left">{file.mime_type}</TableCell>
                  <TableCell className="text-left">
                    {formatFileSize(file.file_size)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(file.id)}
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(file.id)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(file.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

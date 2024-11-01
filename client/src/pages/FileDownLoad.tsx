import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function FileDownLoad() {
  const { token } = useParams();
  const navigate = useNavigate();

  async function handleDownload() {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/file/download/${token}`,
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

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });
  return (
    <div className="flex mx-auto p-8 max-w-4xl text-center justify-center items-center">
      <Button onClick={handleDownload}>Download</Button>
    </div>
  );
}

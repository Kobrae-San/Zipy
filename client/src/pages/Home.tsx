import { Card, CardContent } from "@/components/ui/card";
import FileUpload from "@/components/FileUpload.tsx";
import { AuthContext } from "@/hooks/context";
import { useContext } from "react";

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-8 max-w-4xl text-center">
      <Card className="w-full">
        <CardContent className="pt-6">
          <FileUpload isAuthenticated={isLoggedIn} />
        </CardContent>
      </Card>
    </div>
  );
}

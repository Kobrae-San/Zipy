import { Link, useNavigate } from "react-router-dom";
import { LogOut, History, User } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { AuthContext, UserContext } from "@/hooks/context";
import { useContext } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { setUserId } = useContext(UserContext);

  const handleLogout = async () => {
    await fetch("http://127.0.0.1:3000/api/auth/logout", {
      credentials: "include",
    });

    setIsLoggedIn(false);
    setUserId(undefined);
    navigate("/login");
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
              Zipy
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Button
                  variant="link"
                  className="flex items-center gap-2"
                  onClick={() => navigate("/history")}
                >
                  <History className="h-4 w-4" />
                  History
                </Button>

                <Button
                  variant="link"
                  className="flex items-center gap-2"
                  onClick={() => handleLogout()}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="link"
                  className="flex items-center gap-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="link"
                  className="flex items-center gap-2"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

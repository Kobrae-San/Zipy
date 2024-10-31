import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "@/pages/router.tsx";
import { useState } from "react";

import { AuthContext, UserContext } from "./hooks/context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <UserContext.Provider value={{ userId, setUserId }}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;

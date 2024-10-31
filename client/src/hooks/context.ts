import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

interface UserContextType {
  userId: number | undefined;
  setUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const UserContext = createContext<UserContextType>({
  userId: undefined,
  setUserId: () => {},
});

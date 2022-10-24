import React, { createContext, useContext } from "react";

type AuthState = boolean | undefined;

type AuthenticationContextType = {
  isAuthenticated: AuthState;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<AuthState>>;
};

const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] =
    React.useState<AuthState>(undefined);
  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthenticationContext);
  if (!context)
    throw new Error("useAuthContext must be used inside AuthProvider");
  return context;
};

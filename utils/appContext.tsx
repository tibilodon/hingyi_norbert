"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type AppContextProviderType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextProviderType>({
  isOpen: false,
  setIsOpen: () => {}, // Should have the same signature as the actual setIsOpen function
  loggedIn: false,
  setLoggedIn: () => {},
});

export const useAppProvider = () => {
  return useContext(AppContext);
};

type ProviderProps = {
  children: React.ReactNode;
};
export default function AppContextProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ isOpen, setIsOpen, loggedIn, setLoggedIn }}>
      <>{children}</>
    </AppContext.Provider>
  );
}

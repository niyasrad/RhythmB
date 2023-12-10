import { Dispatch, SetStateAction, createContext, useContext } from "react";

export interface GlobalContextType {
    username: string,
    isLoggedIn: boolean,
    isLoading: boolean,
    setUsername?: Dispatch<SetStateAction<string>>,
    setIsLoggedIn?: Dispatch<SetStateAction<boolean>>,
    setIsLoading?: Dispatch<SetStateAction<boolean>>,
    handleLogIn?: (token: string, username: string) => void,
    handleSignOut?: () => void
}

export const defaultGlobalContextValue: GlobalContextType = {
    username: "",
    isLoggedIn: false,
    isLoading: true
}

export const GlobalContext = createContext<GlobalContextType>(defaultGlobalContextValue)

export const useGlobalContext = () => useContext(GlobalContext)

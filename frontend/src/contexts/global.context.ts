import { Dispatch, SetStateAction, createContext, useContext } from "react";

export interface GlobalContextType {
    username: string,
    userID: string,
    isLoggedIn: boolean,
    isLoading: boolean,
    setUsername?: Dispatch<SetStateAction<string>>,
    setUserID?: Dispatch<SetStateAction<string>>,
    setIsLoggedIn?: Dispatch<SetStateAction<boolean>>,
    setIsLoading?: Dispatch<SetStateAction<boolean>>,
    handleLogIn?: (token: string, username: string, user_id: string) => void,
    handleSignOut?: () => void
}

export const defaultGlobalContextValue: GlobalContextType = {
    username: "",
    userID: "",
    isLoggedIn: false,
    isLoading: true
}

export const GlobalContext = createContext<GlobalContextType>(defaultGlobalContextValue)

export const useGlobalContext = () => useContext(GlobalContext)

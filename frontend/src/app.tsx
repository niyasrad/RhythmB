import { Suspense, lazy, useLayoutEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext, defaultGlobalContextValue } from "./contexts/global.context";
import axios from "axios";

const SignIn = lazy(() => import("./containers/auth/signin"));
const SignUp = lazy(() => import("./containers/auth/signup"));

function AppWrapper({ children }: { children: React.ReactNode }) {

  const [username, setUsername] = useState<string>(defaultGlobalContextValue.username)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(defaultGlobalContextValue.isLoggedIn)
  const [isLoading, setIsLoading] = useState<boolean>(defaultGlobalContextValue.isLoading)

  const handleLogIn = (token: string, username: string) => {
    localStorage.setItem("token", token)
    setUsername(username)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setIsLoggedIn(true)
  }

  const handleSignOut = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setUsername("")
    delete axios.defaults.headers.common['Authorization']
  }

  useLayoutEffect(() => {
    
    const token = localStorage.getItem("token")

    if (!token) {
      setIsLoading(false)
      return
    }
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get(import.meta.env.VITE_BASE_API + '/user/profile')
    .then((res) => {
      const response = res.data
      setUsername(response.data.username)
      setIsLoggedIn(true)
    })
    .catch(() => {
      handleSignOut()
    })
    .finally(() => {
      setIsLoading(false)
    })

  }, [])


  return (
    <GlobalContext.Provider value={{
      username,
      isLoggedIn,
      isLoading,
      setUsername,
      setIsLoggedIn,
      setIsLoading,
      handleLogIn,
      handleSignOut
    }}>
      {children}
    </GlobalContext.Provider>
  )

}

export default function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </AppWrapper>
  )

}
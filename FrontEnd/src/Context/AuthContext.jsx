import React from 'react'
import { createContext, useState, useContext} from 'react'

export const AuthContext = createContext();

export const UseAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {

    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")) || null);

    return <AuthContext.Provider value={{auth, setAuth}}>
        {children}
    </AuthContext.Provider>
}
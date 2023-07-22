import React, { createContext, useState } from "react";

const UserContext = createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState()
    const [needRefresh, setNeedRefresh] = useState(false)

    return (
        <UserContext.Provider value={{user, setUser, needRefresh, setNeedRefresh}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}
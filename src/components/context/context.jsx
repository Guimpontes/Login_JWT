import React, { createContext, useState } from 'react';

export const Context = createContext()

export default function ContextProvider({ children }) {
    const [logged, setLogged] = useState(JSON.parse(localStorage.getItem("logged")) | false);

    return (
        <Context.Provider value={[logged, setLogged]}>
            {children}
        </Context.Provider>
    )
}

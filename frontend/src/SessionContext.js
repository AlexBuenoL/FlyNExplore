import React, { createContext, useState, useContext } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    return (
        <SessionContext.Provider value={{ user, setUser }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);
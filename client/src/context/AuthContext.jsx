import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    //en vez de manejar nuestro localStorage desde el loginPage, lo podemos manejar desde aca
    const updateUser = (data) => {
        setCurrentUser(data)
    }

    //actualizo los datos del localstorage cada vez q cambie algo del currentUser
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return(
        <AuthContext.Provider value={{currentUser, updateUser}}>
            {children}
        </AuthContext.Provider>
    )

}

/*
Creo un contextProvider, le paso children para que cualquier
value que le de, dsp lo pueda usar sin ningun problema en todos los hijos o children de la aplicacion
Por lo tanto, le paso la informacion del usuario actual(la misma la hago un objeto con JSON.parse, pq sino me viene como un string),
esta info se encuentra en el LocalStorage (pq se guardo ahi cuando se logeo, con su token, id, username, password, etc).
Y si no hay info del usuario en el localstorage le paso null 
*/
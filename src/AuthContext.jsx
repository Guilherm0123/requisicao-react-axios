import axios from "axios";
import { createContext } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext()

export const Authprovider = ({children}) => {
    const [user, setUser] = useState(null)

    const LoginUser = async(user) => {
        

        const { data } = await axios.get("https://65ec995d0ddee626c9b0a87f.mockapi.io/api/v1/users")

        if(data) {
            const user_data = data.filter(item => {
                if(item.email === user.email && item.password === user.password){
                    return item
                }
            })

            if(user_data[0]){
                localStorage.setItem('@user', JSON.stringify(user_data))
                setUser(user_data[0])
                toast.success(`Bem-vindo ${user_data[0].name}!`)
                return true
            }
            return false
        }
        return false
    }

    const Logoff = () => {
        setUser(null)
        localStorage.removeItem('@user')
    }

    useEffect(() => {
        const storageUser = localStorage.getItem('@user')

        if(storageUser) {
            setUser(JSON.parse(storageUser))
        }             
    },[])

    return(
        <AuthContext.Provider value={{
            user,
            userLogged: Boolean(user),
            LoginUser,
            Logoff
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}

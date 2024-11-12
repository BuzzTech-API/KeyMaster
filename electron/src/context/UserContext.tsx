import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/user.interface";
import { getCurrentUser } from "../api/getCurrentUser";

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

//ISSO DEVE SER IMPORTADO PARA USAR O USUÁRIO
//exemplo: const {user, setUser} = useUser()
//user já vai conter as infos, e setUser para atualizar o context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getCurrentUser();
            if (response.success && response.user) {
                setUser(response.user);
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};


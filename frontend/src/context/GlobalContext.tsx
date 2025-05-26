// GlobalContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Department } from "../lib/types";
import { getUsers } from "../services/Users";
import { getDepartments } from "../services/Departments";
import { AuthContext } from "./Authentication";
// Context type
interface GlobalContextType {
  users: User[];
  departments: Department[];
  loading: boolean;
  error: string | null;
}

// Default context
const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { userToken, userData } = useContext(AuthContext);

    const fetchDepartments = async () => {
        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (err) {
            console.error('Error fetching departments:', err);
        }
        };
    
        const fetchUsers = async () => {
            try{
                const data = await getUsers()
                setUsers(data)
            }
            catch (err) {
            console.error('Error fetching users:', err);
        }
        }

    useEffect(() => {
        const fetchData = async () => {
        
        try {
            if (userData?.is_manager) {
                await Promise.all([
                    fetchUsers()
                ]);
            }
           
        } catch (err: any) {
            console.error("Error in GlobalProvider:", err);
            setError("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
        };

        fetchData();
        fetchDepartments()
    }, [userData, userToken]);

    return (
        <GlobalContext.Provider
            value={{ users, departments , loading, error }}
        >
        {children}
        </GlobalContext.Provider>
    );
    };

// Hook for usage
export const useGlobalContext = () => useContext(GlobalContext);

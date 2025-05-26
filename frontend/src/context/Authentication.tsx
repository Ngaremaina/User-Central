import React, { createContext, useEffect, useState,ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/Users';

interface UserData {
  id: number;
  username: string;
  email: string;
  is_manager: boolean;
  access_token: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isLoading: boolean;
  handleLoginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
  userToken: string | null;
  userData: UserData | null;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  handleLoginUser: async () => {return false},
  logoutUser: () => {},
  userToken: null,
  userData: null,
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  const handleLoginUser = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await loginUser(email, password);

      const userdata: UserData = res.data;
      if (!userdata.access_token) {
        throw new Error("Missing access token");
      }

      console.log(userdata);
      setUserData(userdata);
      setUserToken(userdata.access_token);

      localStorage.setItem('userInfo', JSON.stringify(userdata));
      localStorage.setItem('userToken', userdata.access_token);

      navigate(userdata.is_manager ? '/manager-dashboard' : '/dashboard');

      return true;
    } catch (error: any) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };


  const logoutUser = () => {
    setUserToken(null)
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userToken')
    setIsLoading(false)
    navigate("/")
  }

  const isLoggedIn = async () =>{
    try{
        setIsLoading(true)
        const usertoken = await localStorage.getItem('userToken') 
        const userinfo = await localStorage.getItem('userInfo')
        if (userinfo){
            setUserToken(usertoken)
            setUserData(JSON.parse(userinfo))
        }
        setIsLoading(false)
    }
    catch(error){
        console.log(`isLogged in error ${error}`)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoading, handleLoginUser, logoutUser, userToken, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };


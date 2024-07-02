import { AuthContext } from "../context/Authentication";
import { useContext } from "react";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { ThreeCircles } from "react-loader-spinner";

export default function AppNav() {
    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
            <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass="flex justify-center h-screen items-center"
                />
        )
    }

    return (
       <div>
            {userToken !== null ? <AppStack /> : <AuthStack />}
        
       </div>
    )
}


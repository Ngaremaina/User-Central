import Login from "../pages/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import LandingPage from "../pages/LandingPage";
import { useGlobalContext } from "../context/GlobalContext";

export default function AuthStack(){
    const { departments } = useGlobalContext()
    console.log(departments)
    
    return(
      <div>
        <Routes>
            <Route path="/" element = {<LandingPage />}></Route>
            <Route path = "/sign in" element = {<Login />}></Route>
            <Route path = "/sign up" element = {<SignUp departments = {departments} /> }></Route>
        </Routes>
        </div>
    )
}
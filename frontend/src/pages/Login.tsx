import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { AuthContext } from "../context/Authentication";
import { Link } from "react-router-dom";
import { FormTemplate } from "../components/forms/FormTemplate";
import { InputTemplate } from "../components/forms/InputTemplate";
import { EnvelopeIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"; 
import { SubmitButton } from "../components/buttons/SubmitButton";
import { AuthUser } from "../lib/types";

const Login: React.FC = () => {
  const [user, setUser] = useState<AuthUser>({
    email: "",
    password: ""
  });

  const { handleLoginUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
 
  const toggleVisibility = () => setShowPassword(prev => !prev);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  
  try {
    const success = await handleLoginUser(user.email, user.password);
    
    if (success) {
      console.log("Login successful");
      // Optionally show a success message or redirect is already handled in loginUser
    } else {
      console.error("Login failed. Please check your credentials.");
      // Optionally set error state here
    }

  } catch (error) {
    console.error("An unexpected error occurred during login:", error);
    // Optionally show a user-facing error toast/alert
  }
};


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (

      <div className="min-h-screen flex fle-col items-center justify-center">
        <div className="py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
            <div className="border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <FormTemplate heading="Sign in" handleSubmit={handleSubmit} subTitle="">
                <InputTemplate
                  label="Email Address"
                  type="email" 
                  name="email" 
                  id="email" 
                  handleChange={handleChange}
                  value={user.email}
                  placeholder="name@company.com"
                  icon = {<EnvelopeIcon className="w-5 h-5 absolute right-4"/>}
                />

                <InputTemplate 
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  id="password" 
                  handleChange={handleChange}
                  value={user.password}
                  placeholder="••••••••"
                  icon={
                      showPassword ? (
                          <EyeSlashIcon
                              className="w-5 h-5 absolute right-4 cursor-pointer"
                              onClick={toggleVisibility}
                          />
                      ) : (
                          <EyeIcon
                              className="w-5 h-5 absolute right-4 cursor-pointer"
                              onClick={toggleVisibility}
                          />
                      )
                  }
                  />
                  <SubmitButton text="Submit"/>

                  <p className="text-sm !mt-6 text-center text-slate-500">Don't have an account <Link to="/sign up" className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap">Register here</Link></p>              

              </FormTemplate>
              
            </div>
            <div className="max-md:mt-8">
              <img src="https://readymadeui.com/login-image.webp" className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover" alt="login img" />
            </div>
          </div>
        </div>
      </div>

  );
};

export default Login;

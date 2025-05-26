import React, { useState } from 'react';
import { DepartmentsProps } from '../lib/types';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/Users';
import { InputTemplate } from '../components/forms/InputTemplate';
import { FormTemplate } from '../components/forms/FormTemplate';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { SubmitButton } from '../components/buttons/SubmitButton';
import { RegisterFormData } from '../lib/templateTypes';


const Register: React.FC<DepartmentsProps> = ({departments}) => {
  console.log(departments)
  const navigate = useNavigate()
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    password: '',
    is_manager: false,
    email: '',
    department_id: 1
  });

  const [showPassword, setShowPassword] = useState(false);
   
  const toggleVisibility = () => setShowPassword(prev => !prev);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: (event.target as HTMLInputElement).checked, 
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await registerUser(formData);
    if (response) {
        navigate("/sign-in"); 
    } else {
        // Optionally show an error message
        console.error("Registration failed");
    }
  };

  

  return (
   <div className="min-h-screen flex fle-col items-center justify-center">
           <div className="py-6 px-4">
             <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
               <div className="border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                 <FormTemplate heading="Sign up" handleSubmit={handleSubmit} subTitle="">
                   <InputTemplate
                    label='Username'
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    handleChange={handleChange}
                    placeholder='johndoe'
                    icon = {<UserCircleIcon className="w-5 h-5 absolute right-4"/>}
                   />
                   <InputTemplate
                    label="Email Address"
                    type="email" 
                    name="email" 
                    id="email" 
                    handleChange={handleChange}
                    value={formData.email}
                    placeholder="name@company.com"
                    icon = {<EnvelopeIcon className="w-5 h-5 absolute right-4"/>}
                  />

                  <div>
                    <label htmlFor="department_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Department:
                    </label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="department_id"
                        name="department_id"
                        value={formData.department_id}
                        onChange={handleChange}
                    >
                        <option value="">Select a department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                  </div>
                    

                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <input
                      type="checkbox"
                      name="is_manager"
                      checked={formData.is_manager}
                      onChange={handleChange}
                      
                    
                    />  Manager
                  </label>
          
                   <InputTemplate 
                     label="Password"
                     type={showPassword ? "text" : "password"}
                     name="password" 
                     id="password" 
                     handleChange={handleChange}
                     value={formData.password}
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

export default Register;

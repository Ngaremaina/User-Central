import axios from "axios";
import axiosInstance from "../lib/api";
// import { UserFormState } from "../lib/types";

export const addUsers = async (formData: any) => {
    try {
        await axios.post('/register', formData);
        // Optionally handle success (e.g., show success message, redirect)
        console.log('User created successfully');
        window.location.reload()
        } 
    catch (error) {
        // Handle error (e.g., show error message to user)
        console.error('Error creating department:', error);
    }

}

export const registerUser = async (formData: any) => {
    try {
      const response = await axios.post('/register', formData);
      // Optionally handle success (i.e show user is registered successfully)
      console.log('User registered successfully');
      return response; // ✅ Return the response
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., display error message to user)
      return null
    }
}


export const loginUser = async (email: string, password: string) => {
    try{
        const res = await axiosInstance.post("/login", { email, password });
        return res.data
    }
    catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., display error message to user)
      return null
    }
}

export const getUsers = async () => {
    try{
        const response = await axiosInstance.get(`/users`)
        return response.data
    }
    catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., display error message to user)
      return null
    }

}

export const getUserDetails = async (id: string | undefined)=> {
    try{
        const response = await axiosInstance.get(`/users/${id}`)
        return response.data
    }
    catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., display error message to user)
      return null
    }

}
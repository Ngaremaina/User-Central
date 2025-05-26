import { ReactNode, FormEvent, ChangeEvent } from "react";

export interface SubmitButtonProps {
    text: string;
}

export interface FormTemplateProps{
    heading: string,
    subTitle: string,
    children: ReactNode;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export interface InputTemplateProps{
    label: string,
    name: string,
    type: string,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string,
    placeholder: string
    id: string
    icon: ReactNode
}

export interface RegisterFormData {
  username: string;
  password: string;
  is_manager: boolean;
  email: string;
  department_id: number;
}
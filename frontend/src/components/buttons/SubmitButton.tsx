import { SubmitButtonProps } from "../../lib/templateTypes"

export const SubmitButton = ({text}: SubmitButtonProps) => {
    return(
        <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
           {text}
        </button>
    )
}
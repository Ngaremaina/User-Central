import { InputTemplateProps } from "../../lib/templateTypes"

export const InputTemplate = ({label, name, type,id, handleChange, value, placeholder, icon}: InputTemplateProps) => {
    return (
        <div>
            <label className="text-slate-800 text-sm font-medium mb-2 block">{label}</label>
            <div className="relative flex items-center">
                <input 
                    name={name}
                    id={id}
                    value={value}
                    type={type} 
                    required 
                    onChange={handleChange}
                    className="w-full text-sm text-slate-800 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    placeholder={placeholder} />
                {icon}
            </div>
        </div>
    )
}
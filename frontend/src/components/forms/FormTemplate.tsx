import { FormTemplateProps } from "../../lib/templateTypes";

export const FormTemplate = ({heading, subTitle, children, handleSubmit}: FormTemplateProps) => {
    return(
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-12">
                <h3 className="text-slate-900 text-3xl font-semibold">{heading}</h3>
                <p className="text-slate-500 text-sm mt-6 leading-relaxed">{subTitle}</p>
            </div>
            {children}
        </form>
    )
}
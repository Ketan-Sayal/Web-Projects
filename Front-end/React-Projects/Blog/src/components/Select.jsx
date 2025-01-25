import React, { forwardRef, useId } from "react";

function Select({
    options = [],
    label,
    className = '',
    ...props
}, ref){
    const id = useId();
    return(
        <div className="flex space-x-2">
        {label && <label className="text-lg font-bold" htmlFor={id}>{label}</label>}
        <select name="" id={id} ref={ref} className={`px-3 py-1 ${className}`} {...props}>
            {options.map((option, index)=>(
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
        </div>
    )
}

export default forwardRef(Select);
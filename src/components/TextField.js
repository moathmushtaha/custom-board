import React from 'react';

export const TextField = ({label, name, error, ...props}) => {
    return (
        <div className="mb-2">
            <label htmlFor={name}>{label}</label>
            <input
                className={`form-control`}
                autoComplete="off"
                name={name}
                {...props}
            />
            <p style={{color: "red"}}>
                {error}
            </p>
        </div>
    )
}
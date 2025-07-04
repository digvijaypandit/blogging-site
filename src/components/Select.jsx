import React, { useId, forwardRef } from 'react';

const Select = forwardRef(function Select(
    {
        options = [],
        label,
        placeholder = 'Select an option',
        className = '',
        ...props
    },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <select
                id={id}
                ref={ref}
                className={`block w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition duration-200 ${className}`}
                {...props}
            >
                <option disabled hidden value="">
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;

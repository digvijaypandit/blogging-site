import React, {useId} from 'react'

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", onChange, ...props },
  ref
) {
  const id = useId();

  const handleChange = (e) => {
    if (type === "file") {
      // Manually call onChange with files (for react-hook-form)
      onChange?.({
        ...e,
        target: {
          ...e.target,
          value: e.target.files, // IMPORTANT: use files, not value
        },
      });
    } else {
      onChange?.(e);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        onChange={handleChange}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
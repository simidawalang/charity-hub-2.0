import React from "react";

const FormField = ({
  id,
  label,
  type,
  onChange,
  placeholder,
  isTextarea,
  required,
  value,
  name,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="font-medium text-[14px] leading-[20px] text-[#808191] mb-[10px] mb-[10px] block"
        >
          {label}
        </label>
      )}
      {isTextarea ? (
        <textarea
          className="w-full px-[15px] py-[15px] sm:px-[25px] outline-none border border-[#3a3a43] bg-transparent text-[14px] placeholder:text-[#4b5264] rounded-[10px]"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={10}
          required={required}
        />
      ) : (
        <input
          type={type}
          className="w-full px-[15px] py-[15px] sm:px-[25px] outline-none border border-[#3a3a43] bg-transparent text-[14px] placeholder:text-[#4b5264] rounded-[10px]"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          step="0.1"
          required={required}
        />
      )}
    </div>
  );
};

export default FormField;

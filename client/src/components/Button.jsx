import React from "react";

const Button = ({ className, type, onClick, title }) => {
  return (
    <button
      className={`font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${className}`}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;

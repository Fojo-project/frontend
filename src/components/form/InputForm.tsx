import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputFormProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const InputForm: React.FC<InputFormProps> = ({
  label,
  name,
  type = "text",
  register,
  error,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium">{label}</label>}
      
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full text-xs rounded p-3 border focus:outline-none focus:ring-1 focus:ring-gray-300 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default InputForm;

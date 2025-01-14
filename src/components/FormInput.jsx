import { Input } from "@/components/ui/input";
import { useState } from "react";

function FormInput({ type, label, placeholder, name, error, errorText }) {
  return (
    <label className="form-control w-full mb-2 mt-3">
      <div className="label">
        <span className="label-text text-black dark:text-gray-200 font-medium">
          {label}
        </span>
      </div>
      <Input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full bg-slate-400 h-12 dark:bg-gray-700 ${error}`}
        name={name}
      />
      {errorText && (
        <div className="label">
          <span className="label-text-alt text-red-700">{errorText}</span>
        </div>
      )}
    </label>
  );
}

export default FormInput;

import { Input } from "@/components/ui/input";

function FormInput({ type, label, placeholder, name, error, errorText }) {
  return (
    <label className="form-control w-full mb-2 mt-3">
      <div className="label">
        <span className="label-text text-black font-medium">{label}</span>
      </div>
      <Input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full ${error}`}
        name={name}
      />
      {errorText && (
        <div className="label">
          <span className="label-text-alt">{errorText}</span>
        </div>
      )}
    </label>
  );
}

export default FormInput;

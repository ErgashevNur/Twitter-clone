import { Textarea } from "@/components/ui/textarea";
function FormInput({ type, label, placeholder, name, error, errorText }) {
  return (
    <label className="form-control w-full mb-2">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <Textarea
        type={type}
        placeholder="Type your message here."
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

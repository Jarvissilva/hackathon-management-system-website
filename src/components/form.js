"use client";

export const Label = ({ label, required }) => {
  return (
    <label htmlFor={`i-${label}`} className="capitalize text-sm">
      {label}
      {required ? <span className="text-red-600"> *</span> : null}
    </label>
  );
};

export const InputContainer = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

export const TextInput = ({
  name,
  label,
  placeholder,
  type = "text",
  value,
  defaultValue,
  required = true,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label label={label} required={required} />
      <input
        name={name}
        id={`i-${label}`}
        type={type}
        className="border text-sm outline-none p-2 rounded-md"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
};
export const Textarea = ({
  name,
  label,
  placeholder,
  value,
  required = true,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label label={label} required={required} />
      <textarea
        name={name}
        id={`i-${label}`}
        className="border text-sm outline-none p-2 rounded-md"
        placeholder={placeholder}
        required={required}
        defaultValue={value}
      ></textarea>
    </div>
  );
};

export const SubmitButton = () => {
  return (
    <>
      <button>Create Hackathon</button>
    </>
  );
};

export const SelectInput = ({ label, name, required = true, options }) => (
  <div className="flex flex-col gap-2">
    <Label label={label} required={required} />
    <select
      id={`i-${label}`}
      name={name}
      className="w-full p-2 text-sm  border rounded-md bg-white"
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

export const MultiCheckBoxSelect = ({
  label,
  type,
  required = true,
  options,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label label={label} required={required} />
        {options.map((option) => (
          <div className="flex gap-2">
            <input name={label} type={type} value={option} id={`i-${option}`} />
            <Label label={option} />
          </div>
        ))}
      </div>
    </>
  );
};
export const FileUpload = ({ label, required = true }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label label={label} required={required} />
        <input type="file" />
      </div>
    </>
  );
};

export default function InputField({
  value,
  label,
  name,
  placeholder,
  type,
  onChange,
  icon,
  cols,
  rows,
}) {
  return (
    <div className="form-group flex flex-col md:flex-1 gap-2">
      {label && (
        <label htmlFor={name} className="flex items-center gap-2 text-offWhite">
          {icon && <span className="text-lg text-offWhite">{icon}</span>}
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          value={value}
          id={name}
          name={name}
          className="form-control px-4 py-2 border-2 rounded-3xl text-dark-green bg-offWhite"
          placeholder={placeholder}
          onChange={onChange}
          cols={cols}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          id={name}
          value={value}
          name={name}
          className="form-control px-4 py-2 border-2 rounded-3xl text-dark-green bg-offWhite flex"
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
}

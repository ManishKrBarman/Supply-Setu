import React from 'react';

export const FormGroup = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const Label = ({ htmlFor, children, required = false, className = '' }) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export const Input = ({
  id,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  error = '',
  ...props
}) => {
  return (
    <>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </>
  );
};

export const Textarea = ({
  id,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  rows = 4,
  error = '',
  ...props
}) => {
  return (
    <>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`
          w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </>
  );
};

export const Select = ({
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  className = '',
  error = '',
  ...props
}) => {
  return (
    <>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${className}
        `}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </>
  );
};

export const Checkbox = ({
  id,
  name,
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  error = '',
  ...props
}) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label htmlFor={id} className={`text-gray-700 ${disabled ? 'opacity-60' : ''}`}>
            {label}
          </label>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export const RadioGroup = ({
  name,
  options = [],
  value,
  onChange,
  disabled = false,
  error = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            id={`${name}-${option.value}`}
            name={name}
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            disabled={disabled}
            className={`
              h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300
              ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            `}
          />
          <label htmlFor={`${name}-${option.value}`} className="ml-3 block text-sm text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const ErrorMessage = ({ children }) => {
  if (!children) return null;
  return <p className="mt-1 text-sm text-red-600">{children}</p>;
};

export const FormDivider = ({ className = '' }) => {
  return <hr className={`my-6 border-gray-300 ${className}`} />;
};
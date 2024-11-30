import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<any>; 
  errors: FieldErrors<any>;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
          ${errors[id] ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'}
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute 
          top-2 
          left-4 
          text-sm 
          font-medium 
          text-neutral-500 
          pointer-events-none 
          transition-all 
          ${errors[id] ? 'text-rose-500 -translate-y-4' : 'text-neutral-400 -translate-y-2'}
        `}
      >
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      {errors[id] && (
        <span className="absolute text-sm text-rose-500 top-10 left-4">{errors[id]?.message?.toString()}</span>
      )}
    </div>
  );
};

export default Input;

'use client';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

export type ValidationRules = UseControllerProps['rules'];

export interface FormControlProps {
  id?: string;
  /** Название поля */
  name: string;
  /** Правила валидации поля */
  rules?: ValidationRules;
  /** testId */
  dataTestId?: string;
  /** placeholder */
  placeholder?: string;
}

export interface FormTextAreaProps extends FormControlProps {
  /** Label */
  label?: string;
  /** Макс. длина */
  maxLength?: number;
}

export const FormTextArea: FC<FormTextAreaProps> = ({ rules, name, placeholder, maxLength, label }) => {
  const [showError, setShowError] = useState(true);

  const {
    field: { onChange, value, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    rules,
  });

  const handleChange = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLTextAreaElement>) => {
      setShowError(false);
      onChange(maxLength ? currentTarget.value.slice(0, maxLength) : currentTarget.value);
    },
    [onChange, maxLength],
  );

  const internalOnBlur = useCallback(() => {
    onBlur();
    setShowError(true);
  }, [onBlur]);

  const handleBlur = useCallback(() => {
    internalOnBlur();
  }, [internalOnBlur]);

  return (
    <div>
      <label htmlFor={name} className="text-sm xl:text-base text-gray-700 dark:text-gray-200">
        {label}
      </label>

      <label className="block mt-3" htmlFor={name}>
        <textarea
          rows={4}
          cols={50}
          maxLength={2000}
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block w-full px-4 py-3 text-sm xl:text-base text-gray-700 bg-white border border-zinc-200 rounded-md focus:border-negroni-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-zinc-600 dark:bg-eboni-900 dark:text-gray-300 dark:focus:border-negroni-300"
        />
      </label>
      {error && showError && <span className="text-red-500 text-xs xl:text-sm pt-1 block">{error?.message}</span>}
    </div>
  );
};

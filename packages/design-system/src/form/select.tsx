"use client";

import { forwardRef } from "react";
import { IOption } from "./option";
import { useFormContext } from "react-hook-form";
import { FormErrorMessage } from "./form-error-message";

type SelectProps = {
  /**
   * @default {name}
   */
  label?: string;
  name: string;
  placeholder?: string;
  options: IOption[];
};

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  ({ name, placeholder, label = name, options }, ref) => {
    const form = useFormContext();
    const state = form.getFieldState(name, form.formState);

    return (
      <label htmlFor={name} className="w-full capitalize">
        {label}
        <select
          className="py-2 px-4 bg-gray-700 mt-2 w-full"
          name={name}
          // @ts-ignore
          ref={ref}
        >
          <option selected disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option value={option.value} key={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {state.error && (
          <FormErrorMessage message={state.error?.message ?? "Woops!"} />
        )}
      </label>
    );
  }
);

Select.displayName = "Select";

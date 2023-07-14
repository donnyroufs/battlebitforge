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
  disabled?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, ...props }, ref) => {
    const form = useFormContext();
    const state = form.getFieldState(props.name, form.formState);

    return (
      <label htmlFor={props.name} className="w-full capitalize">
        {props.label ?? props.name}
        <select
          disabled={props.disabled}
          defaultValue="default"
          className="py-2 px-4 bg-gray-700 mt-2 w-full"
          ref={ref}
          {...props}
        >
          <option value="default">{placeholder}</option>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
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

"use client";

import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormErrorMessage } from "./form-error-message";

type InputProps = {
  /**
   * @default {name}
   */
  label?: string;
  name: string;
  placeholder?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, placeholder, label = name }, ref) => {
    const form = useFormContext();
    const state = form.getFieldState(name, form.formState);

    return (
      <label htmlFor={name} className="flex flex-col capitalize">
        {label}
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          name={name}
          className="py-2 px-4 bg-gray-700 mt-2"
        />
        {state.error && (
          <FormErrorMessage message={state.error?.message ?? "Woops!"} />
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

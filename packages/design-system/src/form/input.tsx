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

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const form = useFormContext();
  const state = form.getFieldState(props.name, form.formState);

  return (
    <label htmlFor={props.name} className="flex flex-col capitalize">
      {props.label ?? props.name}
      <input
        ref={ref}
        type="text"
        className="py-2 px-4 bg-gray-700 mt-2"
        {...props}
      />
      {state.error && (
        <FormErrorMessage message={state.error?.message ?? "Woops!"} />
      )}
    </label>
  );
});

Input.displayName = "Input";

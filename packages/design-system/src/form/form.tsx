"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf, ZodSchema } from "zod";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { ComponentProps } from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

interface IUseZodFormProps<Z extends ZodSchema>
  extends Exclude<UseFormProps<TypeOf<Z>>, "resolver"> {
  schema: Z;
}

export const useZodForm = <Z extends ZodSchema>({
  schema,
  ...formProps
}: IUseZodFormProps<Z>) =>
  useForm({
    ...formProps,
    resolver: zodResolver(schema),
  });

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: Props<T>) => (
  <FormProvider {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
      className={className}
    >
      <fieldset disabled={form.formState.isSubmitting}>{children}</fieldset>
    </form>
  </FormProvider>
);

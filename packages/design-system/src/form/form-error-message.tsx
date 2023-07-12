"use client";

type FormErrorMessageProps = {
  message: string;
};

export function FormErrorMessage({ message }: FormErrorMessageProps) {
  return <p className="text-red-400 p-2">{message}</p>;
}

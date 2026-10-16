import { useState } from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

type FormFieldValue = string | number | boolean;

type FormValues<T> = {
  [K in keyof T]: FormFieldValue;
};

type FormErrors<T> = Partial<Record<keyof T, string>>;

function useForm<T extends FormValues<T>>(
  initialValues: T,
  onSubmit: (values: T) => void,
  validate: (values: T) => FormErrors<T>
) {
  const [values, setValues] = useState<T>(initialValues);

  const [errors, setErrors] = useState<FormErrors<T>>({});

  // HANDLE INPUT CHANGES
  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  // HANDLE FORM SUBMISSION
  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();

    const validationErrors = validate(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
      resetForm();
    }
  };

  // RESET FORM
  const resetForm = (): void => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
  };
}

export default useForm;
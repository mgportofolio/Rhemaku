import React from "react";
import { toast } from "../helpers/toast";

function useForm(
  initialState: any,
  validate: any,
  action: any,
  purpose: string
) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        action();
        setValues(initialState);
        setSubmitting(false);
      } else {
        toast(Object.values(errors).join(" "));
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(event: any) {
    setValues((previousValue: any) => ({
      ...previousValue,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit() {
    const validationError = validate(values, purpose);
    setErrors(validationError);
    setSubmitting(true);
  }

  return {
    handleSubmit,
    handleChange,
    values,
    setValues,
    isSubmitting,
  };
}

export default useForm;

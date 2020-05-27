import * as AuthEnum from "../enum/authenticationEnum";

//Validator for authentication
export default function validateSingup(values: any, purpose: string) {
  let errors: any = {};

  //Fluent Validation for auth:username
  if (!values.name && purpose == AuthEnum.REGISTRATION) {
    errors.name = "A username is required.";
  }

  //Fluent validation for auth:email
  if (
    !values.email &&
    (purpose == AuthEnum.REGISTRATION ||
      purpose == AuthEnum.LOGIN ||
      purpose == AuthEnum.FORGOT_PASSWORD)
  ) {
    errors.email = "Your email is required.";
  } else if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.email) &&
    (purpose == AuthEnum.REGISTRATION ||
      purpose == AuthEnum.LOGIN ||
      purpose == AuthEnum.FORGOT_PASSWORD)
  ) {
    errors.email = "Your email is invalid.";
  }

  //Fluent validation for auth:password
  if (purpose == AuthEnum.REGISTRATION || purpose == AuthEnum.LOGIN) {
    if (!values.password) {
      errors.password = "Your password is required.";
    } else if (values.password.length < 8) {
      errors.password = "Your password must be at least 8 characters long.";
    }
  }

  return errors;
}

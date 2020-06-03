import * as PostEnum from "../enum/postEnum";

//Validator for authentication
export default function validateSingup(values: any, purpose: string) {
  let errors: any = {};

  if (purpose === PostEnum.RHEMA && !values.title) {
    errors.title = "A title is required.";
  }

  if (purpose === PostEnum.RHEMA && !values.verse) {
    errors.verse = "Verse is required.";
  }

  if (purpose === PostEnum.RHEMA && !values.rhema) {
    errors.title = "Rhema is required";
  } else if (purpose === PostEnum.RHEMA && values.rhema.length < 20) {
    errors.rhema = "Rhema must be at least 20 characters";
  }
  return errors;
}

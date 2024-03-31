export const validationFormFields = (value): boolean => {
  if (!value || value == "") {
    return false;
  }
  return true;
};

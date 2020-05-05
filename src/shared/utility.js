export const updateObject = (oldState, newObject) => {
  return {
    ...oldState,
    ...newObject,
  };
};

export const formValidation = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  } else if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  } else {
    isValid = true;
  }
  return isValid;
};

export const inputChangedHandler = (e, form, input) => {
  const updatedForm = updateObject(form, {
    [input]: updateObject(form[input], {
      value: e.target.value,
      valid: formValidation(e.target.value, form[input].validation),
      touched: true,
    }),
  });
  let isFormValid = true;

  for (let input in updatedForm) {
    isFormValid = isFormValid && updatedForm[input].valid;
  }
  return { updatedForm, isFormValid };
};

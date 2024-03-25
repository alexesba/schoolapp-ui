const getError = (errors, name) => {
  const ARRAY_FIELDS = /(\w+)\[(\d+)\]\.(\w+)/;
  const DOT_FIELDS = /(\w+)\.(\w+)/;

  if (ARRAY_FIELDS.test(name)) {
    const [, collectionName, position, fieldName] = name.match(ARRAY_FIELDS);
    if (errors[collectionName]
      && errors[collectionName][position]
      && errors[collectionName][position][fieldName]) {
      return errors[collectionName][position][fieldName];
    }
  }

  if (DOT_FIELDS.test(name)) {
    const [collectionName, fieldName] = name.split('.');
    if (errors[collectionName] && errors[collectionName][fieldName]) {
      return errors[collectionName][fieldName];
    }
  }

  return errors && errors[name];
};

export const getErrorMessage = (errors, name) => getError(errors, name)?.message;
export const hasError = (errors, name) => {
  const err = getError(errors, name);

  return !!err?.message;
};

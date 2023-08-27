import { get, set } from 'lodash';

export const asyncValidator = (schema: any) => (values: any) =>
  schema.validate(values, { abortEarly: false }).catch((error: any) => {
    const errors = {};

    get(error, 'inner', []).forEach(({ message, path }: any) => {
      set(errors, path, message);
    });

    console.log(errors);

    throw errors;
  });

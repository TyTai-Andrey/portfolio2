import * as Yup from 'yup';
import { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

const shape = {
  name: Yup.string()
    .min(4, 'Имя должно содержать хотя бы 4 символа')
    .required('Необходимо ввести имя'),
  password: Yup.string()
    .min(4, 'Пароль должен содержать хотя бы 4 символа')
    .required('Необходимо пароль'),
};

export const schemaValidateLogin = Yup.object()
  .nullable()
  .required('Форма не заполнена')
  .shape(shape);

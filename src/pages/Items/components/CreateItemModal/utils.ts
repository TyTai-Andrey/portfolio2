import * as Yup from 'yup';

const shape = {
  text: Yup.string().required('Необходимо ввести имя'),
};

export const schemaValidateCreateItem = Yup.object()
  .nullable()
  .required('Форма не заполнена')
  .shape(shape);

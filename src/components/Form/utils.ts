import { createEffect, createEvent, createStore } from 'effector';
import { asyncValidator } from '@utils/asyncValidator';
import { showNotification } from '@utils/notifications';

import {
  AnyObject,
  Assign,
  ObjectShape,
  OptionalObjectSchema,
  TypeOfShape,
} from 'yup/lib/object';
import { InputFormProps } from '@components/Input/InputForm/InputForm';
import { ButtonFormProps } from '@components/Button/ButtonForm/ButtonForm';

type UseFormProps<ShapeForm extends ObjectShape> = {
  schema: OptionalObjectSchema<
    ShapeForm,
    AnyObject,
    TypeOfShape<Assign<ObjectShape, ShapeForm>> | null
  >;

  name: string;
  onSubmit: (fields: Record<keyof ShapeForm, string>) => void;
};

export function useForm<R extends ObjectShape>({
  schema,
  name,
  onSubmit,
}: UseFormProps<R>) {
  type _fields = keyof (typeof schema)['fields'];
  type FormStoreFields = Partial<Record<_fields, string>>;
  type FormStore = {
    fields: FormStoreFields;
    errors: FormStoreFields;
  };
  type SetField = { key: _fields; value: string | undefined };
  type Errors = Record<_fields, string> | {};

  const submitted = createEvent();
  const setField = createEvent<SetField>();
  const clear = createEvent();
  const setErrors = createEvent<Errors>();

  const sendFormFx = createEffect(async (form: FormStore) => {
    const validate = asyncValidator(schema);

    try {
      await validate(form.fields);
      onSubmit(form.fields as Record<keyof R, string>);
    } catch (err: any) {
      setErrors(err);
      if (err) {
        for (const key in err) {
          const element = err[key];

          // showNotification({
          //   title: element,
          //   message: element,
          //   type: 'warning',
          // });
        }
      }
    }
  });

  const $form = createStore<FormStore>(
    {
      fields: {},
      errors: {},
    },
    {
      name,
      sid: name,
    },
  );

  $form.on(setErrors, (s, errors) => {
    return {
      ...s,
      errors,
    };
  });

  $form.on(setField, (s, { key, value }) => {
    return {
      ...s,
      fields: {
        ...s.fields,
        [key]: value,
      },
      errors: {
        ...s.errors,
        [key]: undefined,
      },
    };
  });

  $form.reset(clear);

  return { form: $form, setField, submitted, sendFormFx, clear };
}

export type AllFormProps = { formProps: InputFormProps & ButtonFormProps };
export type FormPropsType = AllFormProps['formProps'];

export function getProps<T>(
  props: FormPropsType,
  fields: Array<Partial<keyof FormPropsType>>,
): T {
  let result: any = {};

  for (let index = 0; index < fields.length; index++) {
    const element = fields[index];

    result[element] = props[element];
  }

  return result;
}

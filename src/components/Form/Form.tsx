import React, { PropsWithChildren, memo } from 'react';
import { sample } from 'effector';
import { useForm } from './utils';
import { addExtraPropsChildren } from '@utils/addExtraPropsChildren';
import { v4 as uuid } from 'uuid';
import {
  AnyObject,
  Assign,
  ObjectShape,
  OptionalObjectSchema,
  TypeOfShape,
} from 'yup/lib/object';

interface FormProps<T extends ObjectShape> {
  children: React.ReactNode;
  className?: string;
  onSubmit: (fields: Record<keyof T, string>) => void;

  schema: OptionalObjectSchema<
    T,
    AnyObject,
    TypeOfShape<Assign<ObjectShape, T>> | null
  >;
  name?: string;
}

function Form<T extends ObjectShape>({
  children,
  className,
  onSubmit: _onSubmit,
  schema,
  name,
}: FormProps<T>) {
  const { form, setField, submitted, sendFormFx, clear } = useForm({
    schema,
    name: name ?? uuid(),
    onSubmit: _onSubmit,
  });

  sample({
    clock: submitted,
    source: form,
    target: sendFormFx,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitted) {
      submitted?.();
    }
  };

  return (
    <form className={className} onSubmit={onSubmit}>
      {addExtraPropsChildren(children, {
        $form: form,
        setField,
        clear,
      })}
    </form>
  );
}

export default Form;

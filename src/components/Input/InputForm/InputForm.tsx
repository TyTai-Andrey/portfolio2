import React, { FC, useMemo } from 'react';
import styles from '../Input.module.scss';
import TextField from '@mui/material/TextField';
import classNames from 'classnames';
import { useStoreMap } from 'effector-react';
import { InputProps } from '../Input';
import { Store, Event } from 'effector';

export type InputFormProps = {
  $form: Store<{
    fields: {
      [key: string]: string;
    };
    errors: {
      [key: string]: string;
    };
  }>;
  setField: Event<{ key: string; value: string | undefined }>;
};

export type Props = {
  name: string;
} & InputProps &
  InputFormProps;

export const InputForm: FC<Props> = ({
  $form,
  name,
  className,
  setField,
  ...props
}) => {
  const value = useStoreMap({
    store: $form,
    keys: [name],
    fn: ({ fields }) => fields?.[name] ?? '',
  });

  const error = useStoreMap({
    store: $form,
    keys: [name],
    fn: ({ errors }) => errors?.[name] ?? '',
  });

  const isError = useMemo(() => {
    return !!error;
  }, [error]);

  return (
    <div
      className={classNames(styles.root, className, '123', {
        [styles.error]: isError,
      })}
    >
      <TextField
        {...props}
        className={styles.input}
        onChange={(e: any) => {
          setField({
            key: e.target.name,
            value: e.target.value,
          });
        }}
        value={value}
        error={isError}
        variant='outlined'
        name={name}
      />
      <div
        className={classNames(styles.error, {
          [styles.errorVisible]: error,
        })}
      >
        {error}
      </div>
    </div>
  );
};

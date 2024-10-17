import React, { FC } from 'react';
import styles from './Input.module.scss';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import classNames from 'classnames';
import { InputForm } from './InputForm';
import { AllFormProps, getProps } from '@components/Form/utils';
import { InputFormProps } from './InputForm/InputForm';

export type InputProps = Omit<TextFieldProps, 'error'> & {
  className?: string;
  error?: string;
  withoutError?: boolean;
} & Partial<AllFormProps>;

const Input: FC<Omit<InputProps, 'variant'>> = ({
  className,
  error,
  formProps,
  ...props
}) => {
  if (formProps?.$form && props?.name && formProps?.setField!) {
    const propsInputForm = getProps<InputFormProps>(formProps, [
      '$form',
      'setField',
    ]);

    return <InputForm {...props} {...propsInputForm} name={props.name} />;
  }

  return (
    <div
      className={classNames(styles.root, className, {
        [styles.error]: !!error,
      })}
    >
      <TextField className={styles.input} {...props} variant='outlined' />
      {error && (
        <div
          className={classNames(styles.error, {
            [styles.errorVisible]: error,
          })}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;

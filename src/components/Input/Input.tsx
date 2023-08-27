import React, { FC } from 'react';
import styles from './Input.module.scss';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import classNames from 'classnames';
import { InputForm } from './InputForm';
import { InputFormProps } from './InputForm/InputForm';

export type InputProps = Omit<TextFieldProps, 'error'> & {
  className?: string;
  error?: string;
  withoutError?: boolean;
} & Partial<InputFormProps>;

const Input: FC<Omit<InputProps, 'variant'>> = ({
  className,
  error,
  ...props
}) => {
  if (props.$form && props.name && props.setField) {
    const { $form, name, setField } = props;

    return <InputForm {...props} {...{ $form, name, setField, className }} />;
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

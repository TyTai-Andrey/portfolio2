import React, { FC, memo } from 'react';
import styles from './Button.module.scss';
import ButtonMUI from '@mui/material/Button';
import { ButtonForm, ButtonFormProps } from './ButtonForm/ButtonForm';
import classNames from 'classnames';
import { AllFormProps, getProps } from '@components/Form/utils';

export type ButtonProps = React.ComponentProps<typeof ButtonMUI> &
  Partial<AllFormProps>;

const Button: FC<ButtonProps> = memo(({ formProps, ...props }) => {
  if (formProps && formProps?.$form && formProps?.clear!) {
    const propsButtonForm = getProps<ButtonFormProps>(formProps, [
      '$form',
      'clear',
    ]);
    return (
      <ButtonForm
        {...propsButtonForm}
        {...props}
        className={classNames(styles.root, props.className)}
      />
    );
  }

  return (
    <ButtonMUI
      {...props}
      className={classNames(styles.root, props.className)}
    />
  );
});

export default Button;

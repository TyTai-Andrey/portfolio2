import React, { FC, memo } from 'react';
import styles from './Button.module.scss';
import ButtonMUI from '@mui/material/Button';
import { ButtonForm, ButtonFormProps } from './ButtonForm/ButtonForm';
import classNames from 'classnames';

export type ButtonProps = React.ComponentProps<typeof ButtonMUI> &
  Partial<ButtonFormProps>;

const Button: FC<ButtonProps> = memo(({ $form, clear, ...props }) => {
  if ($form && clear) {
    return (
      <ButtonForm
        {...props}
        {...{ $form, clear }}
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

import React, { FC, memo, useMemo } from 'react';
import ButtonMUI from '@mui/material/Button';
import styles from '../Button.module.scss';
import { useStoreMap } from 'effector-react';
import { Store, Event } from 'effector';
import { ButtonProps } from '../Button';

export type ButtonFormProps = {
  $form: Store<{
    fields: {
      [key: string]: string;
    };
    errors: {
      [key: string]: string;
    };
  }>;
  clear: Event<any>;
};

type Props = {} & ButtonProps & ButtonFormProps;

export const ButtonForm: FC<Props> = memo(({ $form, clear, ...props }) => {
  const errors = useStoreMap({
    store: $form,
    keys: [],
    fn: ({ errors }) => errors,
  });

  const error = useMemo(() => {
    return !!Object.values(errors).filter((i) => !!i).length;
  }, [errors]);

  const isDisabled = useMemo(() => {
    if (props.type === 'submit') return !!(error || props.disabled);
    return props.disabled;
  }, [props.type, error, props.disabled]);

  if (props.type === 'submit')
    return <ButtonMUI disabled={isDisabled} {...props} />;

  if (props.type === 'reset')
    return (
      <ButtonMUI
        disabled={isDisabled}
        onClick={(e) => {
          if (props.onClick) props.onClick(e);
          clear();
        }}
        {...props}
      />
    );
  return <ButtonMUI disabled={isDisabled} {...props} />;
});

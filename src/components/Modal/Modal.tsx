import React, { FC } from 'react';
import styles from './Modal.module.scss';
import { Portal } from '@mui/base';
import classNames from 'classnames';

export interface ModalProps {
  children?: React.ReactNode | ((data: any) => React.ReactNode);
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
}

export const Modal: FC<ModalProps> = ({
  children,
  className,
  style,
  isOpen,
  onClose,
  ...props
}) => {
  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Portal>
      <div className={classNames(styles.root, className)}>
        <div className={styles.backdrop} />

        <div className={styles.content} style={style}>
          <button className={styles.close} onClick={handleClose}>
            <i className='fa fa-times' />
          </button>

          {typeof children === 'function'
            ? (children as Function)({ ...props })
            : React.isValidElement(children)
            ? React.cloneElement(children, {
                ...(children.props ?? {}),
                ...props,
              })
            : children}
        </div>
      </div>
    </Portal>
  );
};

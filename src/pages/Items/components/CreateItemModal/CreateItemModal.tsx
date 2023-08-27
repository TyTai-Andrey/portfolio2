import React, { FC } from 'react';
import styles from './CreateItemModal.module.scss';
import { Modal } from '@components/Modal';
import { ModalComponentProps } from '@components/ModalProvider/ModalProvider';
import Form from '@components/Form/Form';
import Input from '@components/Input';
import { schemaValidateCreateItem } from './utils';
import Button from '@components/Button';
import { addItems } from '@store/items/items';

export type CreateItemModalProps = {} & ModalComponentProps;

export const CreateItemModal: FC<CreateItemModalProps> = ({
  isOpen,
  handleClose,
}) => {
  return (
    <Modal className={styles.root} isOpen={isOpen} onClose={handleClose}>
      <Form
        name='1234'
        onSubmit={(fields) => {
          const id = Date.now();

          addItems({
            text: fields.text,
            id,
            path: `/item/${id}`,
          });

          handleClose();
        }}
        schema={schemaValidateCreateItem}
      >
        <Input className={styles.inputForm} name='text' label={'text'} />

        <Button type='submit' variant='contained'>
          Create
        </Button>
      </Form>
    </Modal>
  );
};

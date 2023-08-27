import React from 'react';
import { ModalContext } from '@components/ModalProvider';
import { useContext } from 'react';

export function useModal() {
  const { openModal, closeModal } = useContext(ModalContext);

  return { openModal, closeModal };
}

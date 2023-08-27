import React, { useCallback, useState } from 'react';

export interface ModalComponentProps {
  handleClose: () => void;
  isOpen: boolean;
}

type ModalProviderState = {
  modal: React.FC | null;
  isOpen: boolean;
  modalProps: any;
};

const initialState = {
  modal: null,
  isOpen: false,
  modalProps: null,
};

export const ModalContext = React.createContext<{
  openModal: (modal: React.FC<any>, modalProps?: any) => void;
  closeModal: () => void;
}>({
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ModalProviderState>(initialState);
  const Component = state.modal ? state.modal : null;
  const openModal = useCallback(
    (modal: React.FC<any>, modalProps: any = {}) => {
      document.body.style.overflow = 'hidden';

      setState({
        modal,
        isOpen: true,
        modalProps,
      });
    },
    [setState],
  );

  const closeModal = useCallback(() => {
    document.body.style.overflow = '';

    setState(initialState);
  }, [setState]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {state.isOpen && Component && (
        <Component
          isOpen={state.isOpen}
          handleClose={closeModal}
          {...state.modalProps}
        />
      )}
    </ModalContext.Provider>
  );
};

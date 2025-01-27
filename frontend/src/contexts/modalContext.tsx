import { createContext, ReactNode } from "react";

import { useAlertModal } from "../hooks/useAlertModal";
import { AlertModal } from "../Components/AlertModal";

type IModalContext = {
  isShown: boolean;
  onHide: () => void;
  showModal: ({
    message,
    header,
  }: {
    message: string | ReactNode;
    header: string | ReactNode;
  }) => void;
  message: string | ReactNode;
  header: string | ReactNode;
};

const ModalContext = createContext<IModalContext>({
  isShown: false,
  onHide: () => {},
  showModal: () => {},
  message: "",
  header: "",
});
const { Provider } = ModalContext;

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { onHide, isShown, showModal, setMessage, setHeader, message, header } =
    useAlertModal();

  const handleShowModal = ({
    message,
    header,
  }: {
    message: string | ReactNode;
    header: string | ReactNode;
  }) => {
    setHeader(header);
    setMessage(message);
    showModal();
  };

  return (
    <Provider
      value={{
        isShown,
        onHide,
        showModal: handleShowModal,
        message,
        header,
      }}
    >
      <AlertModal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };

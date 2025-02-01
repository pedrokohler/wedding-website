import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ModalContext } from "../contexts/modalContext";

export function AlertModal() {
  const { onHide, isShown, header, message } = useContext(ModalContext);
  return (
    <Modal
      show={isShown}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}

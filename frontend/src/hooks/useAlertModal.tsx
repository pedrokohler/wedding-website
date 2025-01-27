import { ReactNode, useCallback, useState } from "react";

export function useAlertModal(handleClose?: (...props: unknown[]) => void) {
  const [isShown, setIsShown] = useState(false);
  const [message, setMessage] = useState<string | ReactNode>("");
  const [header, setHeader] = useState<string | ReactNode>("");

  const onHide = useCallback(() => {
    if (typeof handleClose === "function") {
      handleClose();
    }
    setIsShown(false);
  }, [handleClose, setIsShown]);

  const showModal = () => setIsShown(true);

  return { onHide, isShown, showModal, setMessage, setHeader, message, header };
}

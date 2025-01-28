import { useCallback, useContext, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/esm/Button";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "@tanstack/react-query";

import { TextInput } from "../../TextInput";
import { TextArea } from "../../TextArea";
import { ModalContext } from "../../../contexts/modalContext";

type MessageDto = {
  name: string;
  message: string;
};

export const MessageForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const isAbove500w = useMediaQuery("(min-width: 500px)");
  const isAbove750w = useMediaQuery("(min-width: 750px)");
  const { showModal } = useContext(ModalContext);

  const handleError = useCallback(
    (error: unknown) => {
      console.error(error);
      showModal({
        header: "Erro",
        message: "Houve um problema ao enviar a mensagem.",
      });
    },
    [showModal]
  );

  const mutation = useMutation({
    mutationFn: (newMessage: MessageDto) => {
      const body = JSON.stringify(newMessage);
      return fetch(`${import.meta.env.VITE_API_URL}/messages`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (data) => {
      if (data.status >= 400) {
        return handleError({
          status: data.status,
          message: data.statusText,
        });
      }
      setMessage("");
      setName("");
      showModal({ header: "Sucesso", message: "Sua mensagem foi enviada!" });
    },
    onError: handleError,
  });

  return (
    <Stack
      style={{
        maxWidth: "80%",
        width: isAbove750w ? "420px" : isAbove500w ? "300px" : undefined,
        alignSelf: "center",
      }}
      gap={2}
    >
      <TextArea
        id={"message"}
        placeholder={"Escreva uma mensagem"}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <TextInput
        id={"name"}
        placeholder={"Nome"}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Button
        disabled={mutation.isPending}
        style={{
          width: "38%",
          alignSelf: "flex-end",
        }}
        onClick={() =>
          mutation.mutate({
            message,
            name,
          })
        }
      >
        ENVIAR
      </Button>
    </Stack>
  );
};

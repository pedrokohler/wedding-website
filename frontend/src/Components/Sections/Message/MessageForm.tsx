import { useCallback, useContext } from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/esm/Button";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { FormInput } from "../../FormInput";
import { TextArea } from "../../TextArea";
import { ModalContext } from "../../../contexts/modalContext";
import { createRegisterOptions } from "../../../utils/createRegisterOptions";

type MessageDto = {
  name: string;
  message: string;
};

export const MessageForm = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<MessageDto>();

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
      resetField("message");
      resetField("name");
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
      <TextArea<MessageDto>
        placeholder={"Escreva uma mensagem"}
        name={"message"}
        errors={errors}
        register={register}
        registerOptions={createRegisterOptions({
          required: true,
          minLength: 10,
          maxLength: 1000,
        })}
      />
      <FormInput<MessageDto>
        placeholder={"Nome"}
        name={"name"}
        register={register}
        registerOptions={createRegisterOptions({
          required: true,
          minLength: 3,
          maxLength: 30,
        })}
        errors={errors}
        type="text"
      />
      <Button
        disabled={mutation.isPending}
        style={{
          width: "38%",
          alignSelf: "flex-end",
        }}
        onClick={handleSubmit((messageDto) => mutation.mutate(messageDto))}
      >
        ENVIAR
      </Button>
    </Stack>
  );
};

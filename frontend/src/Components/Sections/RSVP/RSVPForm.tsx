import { ChangeEventHandler, useCallback, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Stack from "react-bootstrap/Stack";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";
import Button from "react-bootstrap/esm/Button";
import { useMediaQuery } from "usehooks-ts";
import { useForm } from "react-hook-form";

import { FormInput } from "../../FormInput";
import { NumberInput } from "../../NumberInput";
import { IconButton } from "../../IconButton";
import { ModalContext } from "../../../contexts/modalContext";
import { createRegisterOptions } from "../../../utils/createRegisterOptions";
import { telephoneMask } from "../../../utils/telephoneMask";

const ChildrenInput = ({
  value,
  setValue,
  onChange,
}: {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  const isAbove400w = useMediaQuery("(min-width: 400px)");
  const isValidValue = (newValue: number) => {
    if (newValue >= 0 && newValue <= 10) {
      return true;
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        color: "black",
      }}
    >
      <span>Crianças acima de 12 anos:</span>
      <IconButton
        style={{
          padding: isAbove400w ? "0 16px" : "0 4px",
        }}
        icon={DashCircle}
        onClick={() => {
          const newValue = value - 1;
          if (isValidValue(newValue)) {
            setValue(newValue);
          }
        }}
      />
      <NumberInput
        id="children"
        placeholder="0"
        value={value}
        onChange={(e) => {
          if (isValidValue(Number(e.target.value))) {
            onChange(e);
          }
        }}
      />
      <IconButton
        style={{
          padding: isAbove400w ? "0 16px" : "0 4px",
        }}
        icon={PlusCircle}
        onClick={() => {
          const newValue = value + 1;
          if (isValidValue(newValue)) {
            setValue(newValue);
          }
        }}
      />
    </div>
  );
};

type GuestDto = {
  name: string;
  plusOne?: string;
  children?: number;
  phone: string;
};

export const RSVPForm = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<GuestDto>();

  const [children, setChildren] = useState(0);

  const isAbove500w = useMediaQuery("(min-width: 500px)");
  const isAbove750w = useMediaQuery("(min-width: 750px)");
  const { showModal } = useContext(ModalContext);

  const handleError = useCallback(
    (error: unknown) => {
      console.error(error);
      showModal({
        header: "Erro",
        message: "Houve um problema ao confirmar presença.",
      });
    },
    [showModal]
  );

  const mutation = useMutation({
    mutationFn: (newGuest: GuestDto) => {
      const body = JSON.stringify(newGuest);
      return fetch(`${import.meta.env.VITE_API_URL}/guests`, {
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
      setChildren(0);
      resetField("name");
      resetField("plusOne");
      resetField("phone");
      showModal({ header: "Sucesso", message: "Sua presença foi confirmada!" });
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
      <FormInput
        errors={errors}
        name="name"
        placeholder="Nome"
        register={register}
        registerOptions={createRegisterOptions({
          required: true,
          minLength: 3,
          maxLength: 30,
        })}
        type="text"
      />
      <FormInput
        errors={errors}
        name="plusOne"
        placeholder="Acompanhante"
        register={register}
        registerOptions={createRegisterOptions({
          required: false,
          minLength: 3,
          maxLength: 30,
        })}
        type="text"
      />
      <ChildrenInput
        value={children}
        setValue={setChildren}
        onChange={(e) => setChildren(Number(e.target.value))}
      />
      <FormInput<GuestDto>
        errors={errors}
        name="phone"
        placeholder="(31) 98888-8888"
        register={register}
        registerOptions={{
          required: { value: true, message: "Campo obrigatório" },
          minLength: {
            value: 15,
            message: "Insira um telefone válido",
          },
          pattern: {
            value: /\(([0-9]{2})\)\s([987]{1})?([0-9]{4})-([0-9]{4})/,
            message: "Insira um telefone válido",
          },
        }}
        mask={telephoneMask}
        type="tel"
      />
      <Button
        size="lg"
        onClick={handleSubmit(
          ({ phone, name, plusOne }) =>
            mutation.mutate({
              phone,
              name,
              plusOne,
              children,
            }),
          console.error
        )}
      >
        CONFIRMAR
      </Button>
    </Stack>
  );
};

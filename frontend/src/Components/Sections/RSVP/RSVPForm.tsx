import { ChangeEventHandler, useCallback, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Stack from "react-bootstrap/Stack";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";
import Button from "react-bootstrap/esm/Button";
import { useMediaQuery } from "usehooks-ts";

import { TextInput } from "../../TextInput";
import { NumberInput } from "../../NumberInput";
import { TelephoneInput } from "../../TelephoneInput";
import { IconButton } from "../../IconButton";
import { ModalContext } from "../../../contexts/modalContext";

const ChildrenInput = ({
  value,
  setValue,
  onChange,
}: {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
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
      <span>Crianças:</span>
      <IconButton
        icon={DashCircle}
        onClick={() => {
          setValue((oldVal) => oldVal - 1);
        }}
      />
      <NumberInput
        id={"children"}
        placeholder="0"
        value={value}
        onChange={onChange}
      />
      <IconButton
        icon={PlusCircle}
        onClick={() => {
          setValue((oldVal) => oldVal + 1);
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
  const [name, setName] = useState("");
  const [plusOne, setPlusOne] = useState("");
  const [children, setChildren] = useState(0);
  const [phone, setPhone] = useState("");

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
      return fetch("http://localhost:3000/guests", {
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
      setPlusOne("");
      setChildren(0);
      setPhone("");
      setName("");
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
      <TextInput
        id={"name"}
        placeholder={"Nome"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        id={"plusOne"}
        placeholder={"Acompanhante"}
        value={plusOne}
        onChange={(e) => setPlusOne(e.target.value)}
      />
      <ChildrenInput
        value={children}
        setValue={setChildren}
        onChange={(e) => setChildren(Number(e.target.value))}
      />
      <TelephoneInput
        id={"phone"}
        placeholder="(31) 98888-8888"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button
        size="lg"
        onClick={() =>
          mutation.mutate({
            name,
            plusOne,
            children,
            phone,
          })
        }
      >
        CONFIRMAR
      </Button>
    </Stack>
  );
};

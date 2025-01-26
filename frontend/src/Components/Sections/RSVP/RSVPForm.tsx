import Stack from "react-bootstrap/Stack";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";
import Button from "react-bootstrap/esm/Button";
import { useMediaQuery } from "usehooks-ts";

import { TextInput } from "../../TextInput";
import { NumberInput } from "../../NumberInput";
import { TelephoneInput } from "../../TelephoneInput";
import { IconButton } from "../../IconButton";

const ChildrenInput = () => {
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
      <IconButton icon={DashCircle} onClick={() => {}} />
      <NumberInput id={"children"} placeholder="0" />
      <IconButton icon={PlusCircle} onClick={() => {}} />
    </div>
  );
};

export const RSVPForm = () => {
  const isAbove500w = useMediaQuery("(min-width: 500px)");
  const isAbove750w = useMediaQuery("(min-width: 750px)");

  return (
    <Stack
      style={{
        maxWidth: "80%",
        width: isAbove750w ? "420px" : isAbove500w ? "300px" : undefined,
        alignSelf: "center",
      }}
      gap={2}
    >
      <TextInput id={"name"} placeholder={"Nome"} />
      <TextInput id={"plusOne"} placeholder={"Acompanhante"} />
      <ChildrenInput />
      <TelephoneInput id={"phone"} placeholder="(31) 98888-8888" />
      <Button size="lg">CONFIRMAR</Button>
    </Stack>
  );
};

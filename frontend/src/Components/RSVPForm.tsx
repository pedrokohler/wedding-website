import Stack from "react-bootstrap/Stack";
import { TextInput } from "./TextInput";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { DashCircle, PlusCircle, Icon } from "react-bootstrap-icons";
import { NumberInput } from "./NumberInput";
import { TelephoneInput } from "./TelephoneInput";
import Button from "react-bootstrap/esm/Button";

const IconButton = ({ icon: IconComponent }: { icon: Icon }) => {
  return (
    <div
      style={{
        height: "fit-content",
        width: "fit-content",
        padding: "0 16px",
      }}
      className="icon-button"
    >
      <IconComponent />
    </div>
  );
};

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
      <IconButton icon={DashCircle} />
      <NumberInput id={"children"} placeholder="0" />
      <IconButton icon={PlusCircle} />
    </div>
  );
};

export const RSVPForm = () => {
  const { isAbove500w, isAbove750w } = useMediaQuery();

  return (
    <Stack
      style={{
        maxWidth: "80%",
        width: isAbove750w ? "420px" : isAbove500w ? "300px" : undefined,
        alignSelf: "center",
      }}
      gap={2}
    >
      <TextInput id={"name"} placeholder={"Nome"}></TextInput>
      <TextInput id={"plusOne"} placeholder={"Acompanhante"}></TextInput>
      <ChildrenInput />
      <TelephoneInput id={"phone"} placeholder="(31) 98888-8888" />
      <Button
        style={{
          backgroundColor: "#1b4a92",
        }}
      >
        Confirmar
      </Button>
    </Stack>
  );
};

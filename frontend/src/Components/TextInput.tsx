import { ChangeEventHandler } from "react";
import Form from "react-bootstrap/Form";

export function TextInput({
  id,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <Form.Control
      style={{ width: "100%" }}
      type="text"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

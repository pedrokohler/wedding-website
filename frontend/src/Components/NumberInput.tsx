import { ChangeEventHandler } from "react";
import Form from "react-bootstrap/Form";

export function NumberInput({
  id,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  placeholder: string;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <Form.Control
      style={{ maxWidth: "48px" }}
      type="number"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

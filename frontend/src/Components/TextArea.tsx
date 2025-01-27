import { ChangeEventHandler } from "react";
import Form from "react-bootstrap/Form";

export function TextArea({
  id,
  placeholder,
  value,
  onChange,
  rows = 4,
}: {
  id: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  rows?: number;
}) {
  return (
    <Form.Control
      style={{ width: "100%", resize: "none" }}
      type="text"
      id={id}
      placeholder={placeholder}
      as="textarea"
      rows={rows}
      value={value}
      onChange={onChange}
    />
  );
}

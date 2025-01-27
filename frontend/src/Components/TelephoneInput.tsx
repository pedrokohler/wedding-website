import { ChangeEventHandler } from "react";
import Form from "react-bootstrap/Form";

export function TelephoneInput({
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
      type="tel"
      id={id}
      pattern="(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

import Form from "react-bootstrap/Form";

export function TelephoneInput({
  id,
  placeholder,
}: {
  id: string;
  placeholder: string;
}) {
  return (
    <Form.Control
      style={{ width: "100%" }}
      type="tel"
      id={id}
      pattern="(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})"
      placeholder={placeholder}
    />
  );
}

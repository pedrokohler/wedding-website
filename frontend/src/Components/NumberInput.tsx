import Form from "react-bootstrap/Form";

export function NumberInput({
  id,
  placeholder,
}: {
  id: string;
  placeholder: string;
}) {
  return (
    <Form.Control
      style={{ maxWidth: "48px" }}
      type="number"
      id={id}
      placeholder={placeholder}
    />
  );
}

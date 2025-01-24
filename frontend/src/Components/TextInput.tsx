import Form from "react-bootstrap/Form";

export function TextInput({
  id,
  placeholder,
}: {
  id: string;
  placeholder: string;
}) {
  return (
    <Form.Control
      style={{ width: "100%" }}
      type="text"
      id={id}
      placeholder={placeholder}
    />
  );
}

import Form from "react-bootstrap/Form";

export function TextArea({
  id,
  placeholder,
  rows = 4,
}: {
  id: string;
  placeholder: string;
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
    />
  );
}

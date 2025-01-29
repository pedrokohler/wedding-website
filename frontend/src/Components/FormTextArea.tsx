import Form from "react-bootstrap/Form";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export function FormTextArea<T extends FieldValues>({
  name,
  registerOptions,
  register,
  errors,
  placeholder,
  rows = 4,
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
  registerOptions: RegisterOptions<T, Path<T>> | undefined;
  errors: FieldErrors<T>;
  placeholder: string;
  rows?: number;
}) {
  return (
    <>
      <Form.Control
        className={errors[name] ? "error" : ""}
        style={{ width: "100%", resize: "none" }}
        type="text"
        placeholder={placeholder}
        as="textarea"
        rows={rows}
        {...register(name, registerOptions)}
      />
      {errors[name] && typeof errors[name].message === "string" ? (
        <sub
          style={{ alignSelf: "flex-start", color: "red", marginBottom: "8px" }}
        >
          {errors[name].message}
        </sub>
      ) : (
        <></>
      )}
    </>
  );
}

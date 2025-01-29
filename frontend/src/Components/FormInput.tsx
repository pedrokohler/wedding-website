import Form from "react-bootstrap/Form";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export function FormInput<T extends FieldValues>({
  placeholder,
  name,
  registerOptions,
  register,
  errors,
  type,
  mask,
}: {
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  registerOptions: RegisterOptions<T, Path<T>> | undefined;
  errors: FieldErrors<T>;
  type?: string;
  mask?: (value: string) => string;
}) {
  const { onChange, ...restOfRegisterProps } = register(name, registerOptions);

  const handleChange =
    typeof mask === "function"
      ? (e) => {
          const inputValue = e.target.value;
          const maskedValue = mask(inputValue);
          e.target.value = maskedValue;
          onChange(e);
        }
      : onChange;

  return (
    <>
      <Form.Control
        className={errors[name] ? "error" : ""}
        style={{ width: "100%" }}
        type={type}
        placeholder={placeholder}
        {...restOfRegisterProps}
        onChange={handleChange}
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

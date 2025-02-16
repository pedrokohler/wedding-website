import { ChangeEvent } from "react";
import { Form, ListGroup, Spinner } from "react-bootstrap";
import {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export default function FormInputTypeahead<T extends FieldValues>({
  options = [],
  setValue,
  isLoading,
  watch,
  placeholder,
  name,
  errors,
  clearErrors,
  registerOptions,
  register,
  isFromList,
  setIsFromList,
}: {
  options: string[];
  setValue: UseFormSetValue<T>;
  isLoading: boolean;
  watch: UseFormWatch<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  registerOptions: RegisterOptions<T, Path<T>> | undefined;
  errors: FieldErrors<T>;
  clearErrors: UseFormClearErrors<T>;
  isFromList: boolean;
  setIsFromList: (val: boolean) => void;
}) {
  const value = watch(name);
  const { onChange, ...rest } = register(name, registerOptions);

  const handleInputChange = (e: ChangeEvent) => {
    onChange(e);
    setIsFromList(false);
  };

  const onNameSelected = (selectedName: string) => {
    setValue(name, selectedName as PathValue<T, Path<T>>);
    setIsFromList(true);
    clearErrors(name);
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Form.Group
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Form.Control
          type="text"
          autoComplete="off"
          onChange={handleInputChange}
          value={value}
          placeholder={placeholder}
          {...rest}
        />
        {errors[name] && typeof errors[name].message === "string" ? (
          <sub
            style={{
              alignSelf: "flex-start",
              color: "red",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            {errors[name].message}
          </sub>
        ) : (
          <></>
        )}
        {!isFromList && options.length > 0 && (
          <ListGroup
            style={{
              position: "absolute",
              width: "100%",
              top: "38px",
              left: "0",
              border: "1px solid #4e72aa",
              zIndex: 999,
            }}
          >
            {options.map((option) => {
              return (
                <ListGroup.Item
                  key={option}
                  className="typeahead-list-group-item"
                  style={{
                    padding: "0.3rem 1.3rem",
                    backgroundColor: "#fff",
                    border: 0,
                  }}
                  onClick={() => onNameSelected(option)}
                >
                  {option}
                </ListGroup.Item>
              );
            })}
            {isLoading && (
              <div
                style={{
                  display: "flex",
                  padding: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid rgba(0, 0, 0, 0.125)",
                }}
              >
                <Spinner animation="border" />
              </div>
            )}
          </ListGroup>
        )}
      </Form.Group>
    </div>
  );
}

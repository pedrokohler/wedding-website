export const createRegisterOptions = ({
  required,
  minLength,
  maxLength,
}: {
  required: boolean;
  minLength: number;
  maxLength: number;
}) => ({
  required: { value: required, message: "Campo obrigatório" },
  minLength: {
    value: minLength,
    message: `Mínimo de ${minLength} caracteres.`,
  },
  maxLength: {
    value: maxLength,
    message: `Máximo de ${maxLength} caracteres.`,
  },
});

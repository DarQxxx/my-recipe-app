import { LoginFormProps } from "./LoginFormProps";

export type RegisterFormProps = LoginFormProps & {
  name: string;
  confirmPassword: string;
};

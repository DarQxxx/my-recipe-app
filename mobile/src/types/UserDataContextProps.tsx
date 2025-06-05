import { UserDataProps } from "./UserDataProps";

export type UserDataContextProps = {
  user: UserDataProps | null;
  setUser: (user: UserDataProps | null) => void;
  loading: boolean;
};

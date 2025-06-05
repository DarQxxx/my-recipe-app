import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserDataProps } from "../types/UserDataProps";
import { UserDataContextProps } from "../types/UserDataContextProps";

const UserContext = createContext<UserDataContextProps | undefined>(undefined);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const json = await AsyncStorage.getItem("user");
        if (json) {
          const parsed = JSON.parse(json);
          setUserData(parsed);
        }
      } catch (e) {
        console.error("Błąd przy ładowaniu usera z AsyncStorage", e);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const setUser = async (user: UserDataProps | null) => {
    try {
      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem("user");
      }
      setUserData(user);
    } catch (e) {
      console.error("Błąd przy zapisie/wyczyszczeniu AsyncStorage", e);
    }
  };

  return (
    <UserContext.Provider value={{ user: userData, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Błąd w dostarczeniu UserProvider");
  return context;
};

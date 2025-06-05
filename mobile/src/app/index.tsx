import { Redirect } from "expo-router";
import { useUser } from "../context/UserContext";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user, loading } = useUser();

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4B5563" />
      </View>
    );
  if (user?.token) {
    return <Redirect href="./(tabs)/recipes" />;
  } else {
    return <Redirect href="./(auth)/login" />;
  }
}

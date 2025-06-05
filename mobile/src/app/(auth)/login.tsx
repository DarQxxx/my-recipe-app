import React from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LoginFormProps } from "@/src/types/LoginFormProps";

export default function Login() {
  const { control, handleSubmit } = useForm<LoginFormProps>();
  const router = useRouter();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (data: LoginFormProps) => {
      const res = await fetch(
        `http://${process.env.EXPO_PUBLIC_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Niepoprawny email lub hasło");
      }

      return res.json();
    },
    onSuccess: async (res) => {
      await AsyncStorage.setItem("user", JSON.stringify(res));
      router.push({ pathname: "/recipes" });
    },
    onError: (error: any) => {
      console.log(error);
      Alert.alert("Błąd logowania", error.message);
    },
  });

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-4">Zaloguj się</Text>

      <Text className="mb-1">Email</Text>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border p-2 mb-4 rounded"
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />

      <Text className="mb-1">Hasło</Text>
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border p-2 mb-4 rounded"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />

      <Button
        title="Zaloguj się"
        onPress={handleSubmit((data) => mutate(data))}
      />

      <View className="flex justify-center items-center mt-6">
        <Text className="dark:text-secondary-dark text-secondary-light font-medium text-xl">
          Nie masz jeszcze konta?{" "}
          <Text
            onPress={() => router.push({ pathname: "/register" })}
            className="dark:text-accent-dark text-accent-light font-medium text-xl"
          >
            Zarejestruj się
          </Text>
        </Text>
      </View>
    </View>
  );
}

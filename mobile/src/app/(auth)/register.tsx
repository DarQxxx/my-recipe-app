import React from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { RegisterFormProps } from "@/src/types/RegisterFormProps";

export default function Register() {
  const { control, handleSubmit } = useForm<RegisterFormProps>();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (data: RegisterFormProps) => {
      const res = await fetch(
        `http://${process.env.EXPO_PUBLIC_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Coś poszło nie tak, spróbuj jeszcze raz");
      }

      return res.json();
    },
    onSuccess: async (res) => {
      await AsyncStorage.setItem("user", JSON.stringify(res));
      router.push({ pathname: "/recipes" });
    },
    onError: (error: any) => {
      Alert.alert("Błąd rejestracji", error.message);
    },
  });

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-4">Zarejestruj się</Text>

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
        title="Zarejestruj się"
        onPress={handleSubmit((data) => loginMutation.mutate(data))}
      />
    </View>
  );
}

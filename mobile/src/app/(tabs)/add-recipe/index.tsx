import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  useForm,
  Controller,
  useFieldArray,
  FieldArrayWithId,
} from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { AddRecipeProps } from "@/src/types/AddRecipeProps";
import { useUser } from "@/src/context/UserContext";

export default function AddRecipe() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<AddRecipeProps>({
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      steps: [{ value: "" }],
      ingredients: [{ value: "" }],
      tags: [{ value: "" }],
    },
  });

  const stepsArray = useFieldArray<AddRecipeProps, "steps", "id">({
    control,
    name: "steps",
  });
  const tagsArray = useFieldArray<AddRecipeProps, "tags", "id">({
    control,
    name: "tags",
  });
  const ingredientsArray = useFieldArray<AddRecipeProps, "ingredients", "id">({
    control,
    name: "ingredients",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddRecipeProps) => {
      const res = await fetch(
        `http://${process.env.EXPO_PUBLIC_API_URL}/recipes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            ...data,
            steps: data.steps
              .filter((ele) => ele.value !== "")
              .map((ele) => ele.value),
            tags: data.tags
              .filter((ele) => ele.value !== "")
              .map((ele) => ele.value),
            ingredients: data.ingredients
              .filter((ele) => ele.value !== "")
              .map((ele) => ele.value),
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Błąd podczas dodawania przepisu");
      }

      return res.json();
    },
    onSuccess: async (res) => {
      reset();
      await queryClient.invalidateQueries({ queryKey: ["recipes"] });
      console.log(res);
      router.push(`/recipe/${res.id}`);
    },
    onError: (error: any) => {
      Alert.alert("Błąd", error.message || "Coś poszło nie tak");
    },
  });

  const renderFieldArray = (
    title: string,
    name: "steps" | "tags" | "ingredients",
    arrayHelpers: {
      fields: FieldArrayWithId<AddRecipeProps, typeof name, "id">[];
      append: (value: { value: string }) => void;
      remove: (index: number) => void;
    }
  ) => (
    <>
      <Text className="font-semibold mt-4 mb-1">{title}</Text>
      {arrayHelpers.fields.map((field, index) => (
        <View key={field.id} className="flex-row items-center mb-2 gap-2">
          <Controller
            control={control}
            name={`${name}.${index}.value`}
            render={({ field }) => (
              <TextInput
                className="border flex-1 p-2 rounded"
                placeholder={`${title} ${index + 1}`}
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          <TouchableOpacity
            onPress={() => arrayHelpers.remove(index)}
            className="bg-red-500 px-2 py-1 rounded"
          >
            <Text className="text-white">Usuń</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Button
        title={`Dodaj kolejny ${title.toLowerCase()}`}
        onPress={() => arrayHelpers.append({ value: "" })}
      />
    </>
  );

  return (
    <ScrollView className="flex-1 px-4 pt-6 bg-white">
      <Text className="text-2xl font-bold mb-4">Dodaj przepis</Text>

      <Text className="mb-1">Nazwa</Text>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            className="border p-2 mb-4 rounded"
            placeholder="Nazwa przepisu"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Text className="mb-1">Opis</Text>
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <TextInput
            multiline
            className="border p-2 mb-4 rounded h-24 text-top"
            placeholder="Opis przepisu"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Text className="mb-1">Obrazek (URL)</Text>
      <Controller
        control={control}
        name="imageUrl"
        render={({ field }) => (
          <TextInput
            className="border p-2 mb-4 rounded"
            placeholder="https://example.com/image.jpg"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      {renderFieldArray("Krok", "steps", stepsArray)}
      {renderFieldArray("Składnik", "ingredients", ingredientsArray)}
      {renderFieldArray("Tag", "tags", tagsArray)}

      <View className="mt-6 mb-10">
        <Button
          title={isPending ? "Dodawanie..." : "Dodaj przepis"}
          onPress={handleSubmit((data) => mutate(data))}
          disabled={isPending}
        />
      </View>
    </ScrollView>
  );
}

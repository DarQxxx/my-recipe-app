import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import RecipeElement from "@/src/components/RecipeElement";
import { RecipeProps } from "@/src/types/RecipeProps";
import { useUser } from "@/src/context/UserContext";
import { RefreshButton } from "@/src/components/RefreshButton";

const fetchData = async (token: string) => {
  const response = await fetch(
    `http://${process.env.EXPO_PUBLIC_API_URL}/recipes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
};

const Recipes = () => {
  const { user, loading } = useUser();
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => fetchData(user?.token!),
  });

  if (isLoading || loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl text-center">Wyszukiwanie przepisów</Text>
        <ActivityIndicator size="large" color="#4B5563" />
      </View>
    );
  }

  if (isError || error) {
    return (
      <View className="flex-1 flex justify-center items-center">
        <Text className="text-2xl text-center">
          Coś poszło nie tak, spróbuj jeszcze raz
        </Text>
        <RefreshButton refetch={refetch} />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View className="flex-1 flex justify-center items-center px-6">
        <Text className="text-2xl text-center">
          Nie znaleziono żadnych przepisów, dodaj swój pierwszy przepis!
        </Text>
      </View>
    );
  }
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          overflow: "visible",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {data.map((recipe: RecipeProps) => (
          <RecipeElement key={recipe.id} {...recipe} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Recipes;

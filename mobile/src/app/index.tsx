import React from "react";
import { Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const fetchData = async () => {
  const response = await fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/`); // Adres API
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json(); // Zwróć odpowiedź jako JSON
};

const Index = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <Text>Wyszukiwanie przepisów</Text>; // Wyświetl loading, jeśli dane są w trakcie ładowania
  }

  if (isError) {
    return <Text>Coś poszło nie tak, spróbuj jeszcze raz</Text>; // Obsługuje błąd, jeśli zapytanie nie powiedzie się
  }
  console.log("Fetched data:", data); // Wyświetl dane w konsoli

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text className="text-red-500 bg-black">elo</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Index;

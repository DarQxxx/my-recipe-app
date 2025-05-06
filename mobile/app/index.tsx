import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  const response = await fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/`); // Adres API
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json(); // Zwróć odpowiedź jako JSON
};

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState("");

  const userId = 1; // <- tymczasowo, w praktyce pobierasz z tokena lub lokalnie

  // const handleAddRecipe = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://${process.env.EXPO_PUBLIC_API_URL}/recipe`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: title,
  //           steps: steps.split(",").map((t) => t.trim()),
  //           tags: tags.split(",").map((t) => t.trim()),
  //           userId,
  //         }),
  //       }
  //     );

  //     const data = await res.json();
  //     console.log("Dodano przepis:", data);
  //   } catch (err) {
  //     console.error("Błąd dodawania:", err);
  //   }
  // };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <Text>Loading...</Text>; // Wyświetl loading, jeśli dane są w trakcie ładowania
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>; // Obsługuje błąd, jeśli zapytanie nie powiedzie się
  }
  console.log("Fetched data:", data); // Wyświetl dane w konsoli

  return (
    <View>
      <TextInput placeholder="Tytuł" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Kroki"
        value={steps}
        onChangeText={setSteps}
        multiline
      />
      <TextInput
        placeholder="Tagi (np. obiad, makaron)"
        value={tags}
        onChangeText={setTags}
      />
      {/* <Button title="Dodaj przepis" onPress={handleAddRecipe} /> */}
    </View>
  );
};

export default AddRecipe;

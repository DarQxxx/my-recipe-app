import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState("");

  const userId = 1; // <- tymczasowo, w praktyce pobierasz z tokena lub lokalnie

  const handleAddRecipe = async () => {
    try {
      const res = await fetch(
        `http://${process.env.EXPO_PUBLIC_API_URL}/recipe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: title,
            steps: steps.split(",").map((t) => t.trim()),
            tags: tags.split(",").map((t) => t.trim()),
            userId,
          }),
        }
      );

      const data = await res.json();
      console.log("Dodano przepis:", data);
    } catch (err) {
      console.error("Błąd dodawania:", err);
    }
  };

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
      <Button title="Dodaj przepis" onPress={handleAddRecipe} />
    </View>
  );
};

export default AddRecipe;

import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { formatDate } from "@/src/utils/formatDate";
import { RecipeProps } from "../types/RecipeProps";
import { useRouter } from "expo-router";

export default function RecipeElement({
  name,
  tags,
  createdAt,
  id,
  imageUrl = "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
}: RecipeProps) {
  const router = useRouter();
  return (
    <View className="w-1/2 my-2 max-h-60">
      <Pressable onPress={() => router.push({ pathname: `../recipe/${id}` })}>
        <View className="mx-2 border-2 border-gray-300 rounded-lg bg-white shadow-md px-2 py-2 h-full">
          <Image
            source={{
              uri: imageUrl,
            }}
            className="w-full h-32 rounded-t-lg"
          />
          <View className="flex-1 flex-column justify-between mt-2">
            <Text
              className="text-center mt-2 font-semibold"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
            <Text className="mt-2 text-start text-gray-500 text-sm">
              Dodane: {formatDate(createdAt)}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

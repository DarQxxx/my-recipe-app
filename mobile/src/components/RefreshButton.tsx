import React from "react";
import { Pressable, Text } from "react-native";

interface RefreshButtonProps {
  refetch: () => void;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({ refetch }) => {
  return (
    <Pressable
      onPress={() => refetch()}
      className="mt-4 bg-gray-400 px-6 py-4 rounded-full"
    >
      <Text>Odśwież</Text>
    </Pressable>
  );
};

export default RefreshButton;

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Text, useColorScheme, View } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
console.log("Screen width:", screenWidth);

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          //   tabBarStyle: {
          //     backgroundColor: "#0f0a23",
          //     borderRadius: 50,
          //     marginHorizontal: 20,
          //   },
          tabBarActiveTintColor: isDark ? "#8A43FF" : "#6200EE",
        }}
      >
        <Tabs.Screen
          name="recipes/index"
          options={{
            title: "Przepisy",
            tabBarIcon: ({ color, size }) => (
              <View
                className={`bg-green-400 flex flex-row w-full flex-1 justify-center items-center min-h-12 overflow-hidden`}
                style={{ minWidth: screenWidth / 2 }}
              >
                <Ionicons name="albums" color={color} size={size} />
                <Text className="ml-2" style={{ color: color }}>
                  Przepisy
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="add-recipe/index"
          options={{
            title: "Dodaj przepis",
            tabBarIcon: ({ color, size }) => (
              <View
                className={`bg-green-400 flex flex-row w-full flex-1 justify-center items-center min-h-12 overflow-hidden`}
                style={{ minWidth: screenWidth / 2 }}
              >
                <Ionicons name="albums" color={color} size={size} />
                <Text className="ml-2" style={{ color: color }}>
                  Dodaj przepis
                </Text>
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

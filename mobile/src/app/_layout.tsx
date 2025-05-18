import { Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../../globals.css";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs>
        <Tabs.Screen name="index" options={{ title: "Przepisy" }} />
        <Tabs.Screen name="add-recipe" options={{ title: "Dodaj" }} />
      </Tabs>
    </QueryClientProvider>
  );
}

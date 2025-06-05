import React from "react";
import { Slot } from "expo-router";
import "../../globals.css";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";
import UserProvider from "../context/UserContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <UserProvider>
          <StatusBar
            style="dark"
            backgroundColor="#ffffff"
            translucent={false}
          />
          <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <SafeAreaView style={{ flex: 1 }}>
              <Slot />
            </SafeAreaView>
          </View>
        </UserProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomePage from "./HomePage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function TabScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator style={styles.container}>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Notification" component={Notification} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { Tabs } from "expo-router";
import React from "react";

import Icons from "@/components/icons/icons";
import Colors from "@/constants/color.constants";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.green,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.gray,
          borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 10,
          height: 65,
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 12,
        },
        tabBarIcon: ({ color, focused }) => {
          return route.name === "index" ? (
            <Icons.Home color={color} focused={focused} />
          ) : route.name === "all-note" ? (
            <Icons.AllNote color={color} focused={focused} />
          ) : null;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="all-note"
        options={{
          title: "All Note",
        }}
      />
    </Tabs>
  );
}

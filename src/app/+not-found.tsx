import Colors from "@/constants/color.constants";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const NotFoundPage = ({}) => {
  return (
    <View
      style={{ backgroundColor: Colors.black }}
      className="flex-1 justify-center items-center space-y-6"
    >
      <Text className="text-2xl text-white mb-4">Page Not Found</Text>
      <Pressable
        style={{ backgroundColor: Colors.gray }}
        onPress={() => router.push("/")}
        className="px-6 py-3 rounded-md"
      >
        <Text className="text-white text-md">Go Home</Text>
      </Pressable>
    </View>
  );
};

export default NotFoundPage;

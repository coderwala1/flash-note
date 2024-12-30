import Icons from "@/components/icons/icons";
import Colors from "@/constants/color.constants";
import Helper from "@/utils/helper.util";
import React from "react";
import { Pressable, Text, View } from "react-native";

const Note = ({
  content,
  isActive,
  handleLongPress,
}: {
  handleLongPress: () => void;
  content: string;
  isActive: boolean;
}) => {
  const cleanedContent = Helper.stripHtmlTags(content);

  return (
    <Pressable onLongPress={handleLongPress}>
      <View
        style={{ backgroundColor: Colors.gray }}
        className="p-4 rounded-md w-full flex flex-row justify-between items-center"
      >
        <Text
          className="text-white text-lg w-[60%]"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {cleanedContent}
        </Text>

        {isActive && <Icons.Active />}
      </View>
    </Pressable>
  );
};

export default Note;

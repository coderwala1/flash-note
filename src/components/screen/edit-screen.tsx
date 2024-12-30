import Colors from "@/constants/color.constants";
import { NoteType } from "@/types/note.type";
import { AsyncStorageUtil } from "@/utils/async-storage.util";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

interface HandleHeadProps {
  tintColor: string;
}

const handleHead = (action: string, tintColor: string) => {
  const label =
    action === actions.heading1
      ? "H1"
      : action === actions.heading2
      ? "H2"
      : "H";
  return <Text style={{ color: tintColor }}>{label}</Text>;
};
const EditScreen = ({
  notes,
  id,
}: {
  notes?: NoteType[];
  id?: string | null;
}) => {
  const richText = React.useRef<RichEditor | null>(null);
  const content = notes?.find((note) => note.id === id)?.content;

  const handleContentChange = async (descriptionText: string) => {
    if (notes && id) {
      const updatedNotes = notes.map((note) => {
        if (note.id === id) {
          return { ...note, content: descriptionText };
        }
        return note;
      });

      await AsyncStorageUtil.setData("notes", updatedNotes);
    }
  };

  const handleFocusPress = () => {
    if (richText.current) {
      richText.current.focusContentEditor();
      setTimeout(() => {
        richText.current?.insertText("");
      }, 100);
    }
  };

  return (
    <SafeAreaView className="flex-1 rounded-lg p-4">
      <ScrollView
        onTouchEnd={handleFocusPress}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <RichEditor
            ref={richText}
            initialContentHTML={content}
            onChange={async (descriptionText) =>
              await handleContentChange(descriptionText)
            }
            editorStyle={{
              backgroundColor: Colors.black,
              color: "#FFFFFF",
              caretColor: "#FFFFFF",
            }}
            className="flex-1 text-white"
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.heading1,
          actions.heading2,
          actions.insertBulletsList,
          actions.setStrikethrough,
          actions.insertOrderedList,
        ]}
        iconMap={{
          [actions.heading1]: (props: HandleHeadProps) =>
            handleHead(actions.heading1, props.tintColor),
          [actions.heading2]: (props: HandleHeadProps) =>
            handleHead(actions.heading2, props.tintColor),
        }}
        style={{
          backgroundColor: Colors.gray,
          padding: 10,
          borderRadius: 50,
          height: 60,
        }}
        iconSize={26}
        iconTint="white"
        selectedIconTint="white"
        selectedButtonStyle={{
          backgroundColor: Colors.green,
          color: "white",
          borderRadius: 50,
          marginHorizontal: 5,
        }}
        unselectedButtonStyle={{
          backgroundColor: Colors.iconBackground,
          color: "white",
          borderRadius: 50,
          marginHorizontal: 5,
        }}
      />
    </SafeAreaView>
  );
};

export default EditScreen;

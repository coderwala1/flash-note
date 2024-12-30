import EditScreen from "@/components/screen/edit-screen";
import Colors from "@/constants/color.constants";
import useNotes from "@/hooks/useNotes";
import { NoteType } from "@/types/note.type";
import { AsyncStorageUtil } from "@/utils/async-storage.util";
import { useEffect } from "react";
import { View } from "react-native";
import uuid from "react-native-uuid";

export default function Home() {
  const { notes, activeNoteId } = useNotes();
  useEffect(() => {
    // Create a default note if no notes are found
    const makeDefaultNote = async () => {
      const notes = (await AsyncStorageUtil.getData("notes")) as NoteType[];
      if (notes && notes.length > 0) return;

      const defaultNote = {
        id: uuid.v4(),
        content: "Welcome! Start writing your first note...",
      };
      await AsyncStorageUtil.setData("notes", [defaultNote]);
      await AsyncStorageUtil.setData("activeNoteId", defaultNote.id);
    };

    makeDefaultNote();
  }, []);

  return (
    <View
      style={{ backgroundColor: Colors.black }}
      className="w-full h-full p-4"
    >
      <EditScreen key={activeNoteId} id={activeNoteId} notes={notes} />
    </View>
  );
}

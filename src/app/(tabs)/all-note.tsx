import Icons from "@/components/icons/icons";
import Note from "@/components/ui/note";
import Colors from "@/constants/color.constants";
import { NoteType } from "@/types/note.type";
import { AsyncStorageUtil } from "@/utils/async-storage.util";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";

export default function AllNote() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const loadNotes = async () => {
    const savedNotes = await AsyncStorageUtil.getData<NoteType[]>("notes");
    const savedActiveNoteId = await AsyncStorageUtil.getData("activeNoteId");

    if (savedNotes && savedNotes.length > 0) {
      setNotes(savedNotes);
      setActiveNoteId(
        typeof savedActiveNoteId === "string" ? savedActiveNoteId : null
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [notes])
  );

  useEffect(() => {
    loadNotes();
  }, []);

  const addNote = async () => {
    const newNote = {
      id: uuid.v4(),
      content: "Hi you can write whatever you want....",
    };
    const updatedNotes = [...notes, newNote];

    await AsyncStorageUtil.setData("notes", updatedNotes);
    setNotes(updatedNotes);
    await AsyncStorageUtil.setData("activeNoteId", newNote.id);
    setActiveNoteId(newNote.id);
  };

  const handleLongPress = (id: string) => {
    if (id === activeNoteId) {
      AsyncStorageUtil.setData("activeNoteId", null);
      setActiveNoteId(null);
    } else {
      AsyncStorageUtil.setData("activeNoteId", id);
      setActiveNoteId(id);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.black }}
      className="flex-1 p-6 relative"
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="flex gap-y-5">
          {notes.map((note) => {
            return (
              <Note
                key={note.id}
                content={note.content}
                isActive={note.id === activeNoteId}
                handleLongPress={() => handleLongPress(note.id)}
              />
            );
          })}
        </View>
      </ScrollView>

      <Pressable
        onPress={addNote}
        style={{ backgroundColor: Colors.green }}
        className={`absolute right-5 bottom-5 p-3 rounded-full`}
      >
        <Icons.Add />
      </Pressable>
    </SafeAreaView>
  );
}

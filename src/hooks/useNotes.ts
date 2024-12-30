import { NoteType } from "@/types/note.type";
import { AsyncStorageUtil } from "@/utils/async-storage.util";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";

const useNotes = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>();

  const fetchNotes = useCallback(async () => {
    const storedNotes = await AsyncStorageUtil.getData<NoteType[]>("notes");
    setNotes(storedNotes || []);
  }, []);

  const fetchActiveNoteId = async () => {
    const activeNoteId = await AsyncStorageUtil.getData("activeNoteId");
    setActiveNoteId(activeNoteId as string);
  };

  useEffect(() => {
    fetchActiveNoteId();
    fetchNotes();
  }, []);

  useFocusEffect(() => {
    fetchActiveNoteId();
    fetchNotes();
  });

  return { notes, activeNoteId };
};

export default useNotes;

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    setSelectedNote,
    archiveNote,
    unarchiveNote,
    toggleShowArchived,
} from "../store/slices/notesSlice";
import type { Note } from "../types/note.types";

export function useNotes() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.notes);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    return {
        ...state,

        selectNote: (note: Note | null) =>
            dispatch(setSelectedNote(note)),

        create: (title: string, content: string) =>
            dispatch(createNote({ title, content })),

        update: (id: number, title: string, content: string) =>
            dispatch(updateNote({ id, title, content })),

        remove: (id: number) =>
            dispatch(deleteNote(id)),

        archive: (id: number) =>
            dispatch(archiveNote(id)),

        unarchive: (id: number) =>
            dispatch(unarchiveNote(id)),

        toggleArchived: () =>
            dispatch(toggleShowArchived()),
    };
}

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

        create: (title: string, content: string, categories?: string[]) =>
            dispatch(createNote({ title, content, categories })),

        update: (id: number, title: string, content: string, categories?: string[]) =>
            dispatch(updateNote({ id, title, content, categories })),

        remove: (id: number) =>
            dispatch(deleteNote(id)),

        archive: (id: number) =>
            dispatch(archiveNote(id)),

        unarchive: (id: number) =>
            dispatch(unarchiveNote(id)),

        toggleArchived: () =>
            dispatch(toggleShowArchived()),

        getAllCategories: () => {
            const allCategories = state.notes.flatMap(note => note.categories || []);
            const stringCategories = allCategories
                .map((cat: any) => typeof cat === 'string' ? cat : cat.category?.name || cat.name || null)
                .filter((cat): cat is string => typeof cat === 'string' && cat.length > 0);
            const uniqueCategories = Array.from(new Set(stringCategories));
            return uniqueCategories.sort();
        },
    };
}

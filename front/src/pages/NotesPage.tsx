import { useState, useEffect } from "react";
import { useNotes } from "../hooks/useNotes";
import NotesSidebar from "../components/NotesSidebar";
import NotesHeader from "../components/NotesHeader";
import NoteEditor from "../components/NoteEditor";

export default function NotesPage() {
	const {
		notes,
		selectedNote,
		loading,
		error,
		showArchived,
		selectNote,
		create,
		update,
		remove,
		archive,
		unarchive,
		toggleArchived,
	} = useNotes();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		if (selectedNote) {
			setTitle(selectedNote.title);
			setContent(selectedNote.content);
		}
	}, [selectedNote]);

	const displayedNotes = notes.filter((n) =>
		showArchived ? n.isArchived : !n.isArchived
	);

	const handleSave = () => {
		if (!title.trim()) return;
		selectedNote
			? update(selectedNote.id, title, content)
			: create(title, content);
	};

	const handleDelete = () => {
		if (!selectedNote) return;
		if (confirm("Delete this note?")) remove(selectedNote.id);
	};

	return (
		<div className="flex h-screen bg-gray-100">
			<NotesSidebar
				notes={displayedNotes}
				selectedNote={selectedNote}
				showArchived={showArchived}
				onNew={() => selectNote(null)}
				onToggleArchived={toggleArchived}
				onSelect={selectNote}
			/>

			<main className="flex-1 flex flex-col">
				{loading && <p className="p-6">Loading...</p>}
				{error && <p className="p-6 text-red-500">{error}</p>}

				{!loading && (
					<>
						<NotesHeader
							title={title}
							onTitleChange={setTitle}
							selectedNote={selectedNote}
							onSave={handleSave}
							onDelete={handleDelete}
							onArchive={() => selectedNote && archive(selectedNote.id)}
							onUnarchive={() => selectedNote && unarchive(selectedNote.id)}
						/>

						<NoteEditor content={content} onChange={setContent} />
					</>
				)}
			</main>
		</div>
	);
}

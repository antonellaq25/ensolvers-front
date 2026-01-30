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
		getAllCategories,
	} = useNotes();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [filterCategories, setFilterCategories] = useState<string[]>([]);

	const availableCategories = getAllCategories();

	useEffect(() => {
		if (selectedNote) {
			setTitle(selectedNote.title);
			setContent(selectedNote.content);
			
			const cats = (selectedNote.categories || []).map((cat: any) =>
				typeof cat === 'string' ? cat : cat.category?.name || cat.name || String(cat)
			);
			setSelectedCategories(cats);
		} else {
			setTitle("");
			setContent("");
			setSelectedCategories([]);
		}
	}, [selectedNote]);

	const displayedNotes = notes.filter((n) => {
	
		const archivedMatch = showArchived ? n.isArchived : !n.isArchived;

		const categoryMatch = filterCategories.length === 0 ||
			filterCategories.some((filterCat) => {
				
				const noteCategories = (n.categories || []).map((cat: any) =>
					typeof cat === 'string' ? cat : cat.category?.name || cat.name || ''
				);
				return noteCategories.includes(filterCat);
			});

		return archivedMatch && categoryMatch;
	});

	const handleSave = () => {
		if (!title.trim()) return;
		selectedNote
			? update(selectedNote.id, title, content, selectedCategories)
			: create(title, content, selectedCategories);
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
				availableCategories={availableCategories}
				filterCategories={filterCategories}
				onFilterCategoriesChange={setFilterCategories}
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
							selectedCategories={selectedCategories}
							availableCategories={availableCategories}
							onCategoriesChange={setSelectedCategories}
						/>

						<NoteEditor content={content} onChange={setContent} />
					</>
				)}
			</main>
		</div>
	);
}

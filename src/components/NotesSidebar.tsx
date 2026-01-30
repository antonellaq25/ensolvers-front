import NotesList from "./NotesList";
import CategoryFilter from "./CategoryFilter";
import type { Note } from "../types/note.types";

interface Props {
	notes: Note[];
	selectedNote: Note | null;
	showArchived: boolean;
	onNew: () => void;
	onToggleArchived: () => void;
	onSelect: (note: Note) => void;
	availableCategories: string[];
	filterCategories: string[];
	onFilterCategoriesChange: (categories: string[]) => void;
}

export default function NotesSidebar({
	notes,
	selectedNote,
	showArchived,
	onNew,
	onToggleArchived,
	onSelect,
	availableCategories,
	filterCategories,
	onFilterCategoriesChange,
}: Props) {
	return (
		<aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
			<div className="p-4 space-y-3">
				<h1 className="text-xl font-bold">My Notes</h1>

				<button
					onClick={onNew}
					className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
				>
					+ New Note
				</button>

				<button
					onClick={onToggleArchived}
					className={`w-full px-4 py-2 rounded-lg ${showArchived
						? "bg-gray-700 text-white"
						: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						}`}
				>
					{showArchived ? "Show Active Notes" : "Show Archived Notes"}
				</button>

				<CategoryFilter
					availableCategories={availableCategories}
					selectedCategories={filterCategories}
					onCategoriesChange={onFilterCategoriesChange}
				/>
			</div>

			<NotesList
				notes={notes}
				selectedNote={selectedNote}
				onSelect={onSelect}
				showArchived={showArchived}
			/>
		</aside>
	);
}

import type { Note } from "../types/note.types";

interface Props {
	title: string;
	onTitleChange: (v: string) => void;
	selectedNote: Note | null;
	onSave: () => void;
	onDelete: () => void;
	onArchive: () => void;
	onUnarchive: () => void;
}

export default function NotesHeader({
	title,
	onTitleChange,
	selectedNote,
	onSave,
	onDelete,
	onArchive,
	onUnarchive,
}: Props) {
	return (
		<header className="h-16 bg-white border-b flex items-center justify-between px-6">
			<input
				value={title}
				onChange={(e) => onTitleChange(e.target.value)}
				placeholder="Note title..."
				className="text-lg font-semibold outline-none w-full max-w-md"
			/>

			<div className="flex gap-2">
				<button
					onClick={onSave}
					disabled={!title.trim()}
					className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
				>
					{selectedNote ? "Save" : "Create"}
				</button>

				{selectedNote && !selectedNote.isArchived && (
					<button
						onClick={onArchive}
						className="px-4 py-2 bg-yellow-500 text-white rounded"
					>
						Archive
					</button>
				)}

				{selectedNote?.isArchived && (
					<button
						onClick={onUnarchive}
						className="px-4 py-2 bg-purple-500 text-white rounded"
					>
						Unarchive
					</button>
				)}

				<button
					onClick={onDelete}
					disabled={!selectedNote}
					className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
				>
					Delete
				</button>
			</div>
		</header>
	);
}

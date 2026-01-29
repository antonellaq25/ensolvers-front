import type { Note } from "../types/note.types";

interface Props {
	notes: Note[];
	selectedNote: Note | null;
	showArchived: boolean;
	onSelect: (note: Note) => void;
}

export default function NotesList({
	notes,
	selectedNote,
	showArchived,
	onSelect,
}: Props) {
	if (notes.length === 0) {
		return (
			<div className="p-3 text-center text-gray-500 text-sm">
				{showArchived ? "No archived notes" : "No active notes"}
			</div>
		);
	}

	return (
		<ul className="flex-1 overflow-y-auto px-2 space-y-1">
			{notes.map((note) => {
				const isActive = note.id === selectedNote?.id;

				return (
					<li
						key={note.id}
						onClick={() => onSelect(note)}
						className={`p-3 rounded-lg cursor-pointer border ${isActive
								? "bg-blue-50 border-blue-400"
								: "hover:bg-gray-100 border-transparent"
							}`}
					>
						<div className="flex justify-between">
							<h2 className="font-medium truncate">{note.title || "Untitled"}</h2>
							{note.isArchived && (
								<span className="text-xs bg-gray-200 px-2 rounded">
									Archived
								</span>
							)}
						</div>

						<p className="text-sm text-gray-500 truncate">
							{note.content || "No content"}
						</p>
					</li>
				);
			})}
		</ul>
	);
}

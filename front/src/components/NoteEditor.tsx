interface Props {
	content: string;
	onChange: (v: string) => void;
}

export default function NoteEditor({ content, onChange }: Props) {
	return (
		<section className="flex-1 p-6 bg-gray-50">
			<textarea
				value={content}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Start writing your note..."
				className="w-full h-full resize-none p-4 rounded border focus:ring-2 focus:ring-blue-500"
			/>
		</section>
	);
}

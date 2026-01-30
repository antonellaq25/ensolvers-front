interface CategoryChipProps {
	categoryName: string;
	onRemove: (name: string) => void;
}

export default function CategoryChip({ categoryName, onRemove }: CategoryChipProps) {
	return (
		<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
			{categoryName}
			<button
				onClick={() => onRemove(categoryName)}
				className="hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center"
				type="button"
			>
				×
			</button>
		</span>
	);
}

import { useState, useRef, useEffect } from "react";

interface CategoryFilterProps {
	availableCategories: string[];
	selectedCategories: string[];
	onCategoriesChange: (categories: string[]) => void;
}

export default function CategoryFilter({
	availableCategories,
	selectedCategories,
	onCategoriesChange,
}: CategoryFilterProps) {
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const toggleCategory = (category: string) => {
		if (selectedCategories.includes(category)) {
			onCategoriesChange(selectedCategories.filter((c) => c !== category));
		} else {
			onCategoriesChange([...selectedCategories, category]);
		}
	};

	const clearAll = () => {
		onCategoriesChange([]);
		setShowDropdown(false);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setShowDropdown(!showDropdown)}
				className={`w-full px-4 py-2 rounded-lg flex items-center justify-between ${
					selectedCategories.length > 0
						? "bg-blue-100 text-blue-800 border border-blue-300"
						: "bg-gray-100 text-gray-700 hover:bg-gray-200"
				}`}
			>
				<span className="text-sm">
					{selectedCategories.length > 0
						? `${selectedCategories.length} categor${selectedCategories.length === 1 ? "y" : "ies"} selected`
						: "Filter by category"}
				</span>
				<span className="text-xs">{showDropdown ? "▲" : "▼"}</span>
			</button>

			{showDropdown && (
				<div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
					{availableCategories.length === 0 ? (
						<div className="px-4 py-3 text-sm text-gray-500">
							No categories available
						</div>
					) : (
						<>
							{availableCategories.map((category) => (
								<label
									key={category}
									className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
								>
									<input
										type="checkbox"
										checked={selectedCategories.includes(category)}
										onChange={() => toggleCategory(category)}
										className="mr-3"
									/>
									<span className="text-sm">{category}</span>
								</label>
							))}
							{selectedCategories.length > 0 && (
								<div className="border-t p-2">
									<button
										onClick={clearAll}
										className="w-full px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
									>
										Clear all filters
									</button>
								</div>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
}

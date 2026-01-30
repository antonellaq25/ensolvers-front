import { useState, useRef, useEffect } from "react";
import CategoryChip from "./CategoryChip";

interface CategorySelectorProps {
	selectedCategories: string[];
	availableCategories: string[];
	onCategoriesChange: (categories: string[]) => void;
}

export default function CategorySelector({
	selectedCategories,
	availableCategories,
	onCategoriesChange,
}: CategorySelectorProps) {
	const [inputValue, setInputValue] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const filteredCategories = availableCategories
		.filter((cat) => typeof cat === 'string' && cat) 
		.filter(
			(cat) =>
				cat.toLowerCase().includes(inputValue.toLowerCase()) &&
				!selectedCategories.some((selected) => selected.toLowerCase() === cat.toLowerCase())
		);

	const handleAddCategory = () => {
		const trimmed = inputValue.trim();
		if (!trimmed) return;

		if (selectedCategories.some((cat) => cat.toLowerCase() === trimmed.toLowerCase())) {
			setInputValue("");
			setShowSuggestions(false);
			return;
		}

		onCategoriesChange([...selectedCategories, trimmed]);
		setInputValue("");
		setShowSuggestions(false);
	};

	const handleRemoveCategory = (name: string) => {
		onCategoriesChange(selectedCategories.filter((cat) => cat !== name));
	};

	const handleSelectSuggestion = (category: string) => {
		
		if (selectedCategories.some((cat) => cat.toLowerCase() === category.toLowerCase())) {
			setInputValue("");
			setShowSuggestions(false);
			return;
		}

		onCategoriesChange([...selectedCategories, category]);
		setInputValue("");
		setShowSuggestions(false);
		inputRef.current?.focus();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddCategory();
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative">
			<div className="flex items-start gap-3">
				<label className="text-gray-600 font-medium pt-2 min-w-fit">
					Categories
				</label>

				<div className="flex-1 relative">
					<div className="flex flex-wrap gap-2 items-center border rounded p-2 bg-white">
						{selectedCategories.map((category) => (
							<CategoryChip
								key={category}
								categoryName={category}
								onRemove={handleRemoveCategory}
							/>
						))}

						<input
							ref={inputRef}
							type="text"
							value={inputValue}
							onChange={(e) => {
								setInputValue(e.target.value);
								setShowSuggestions(e.target.value.length > 0);
							}}
							onKeyDown={handleKeyDown}
							onFocus={() => inputValue && setShowSuggestions(true)}
							placeholder={selectedCategories.length === 0 ? "Add categories..." : ""}
							className="flex-1 outline-none min-w-[120px] text-sm"
						/>
					</div>

					{showSuggestions && filteredCategories.length > 0 && (
						<div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
							{filteredCategories.map((category) => (
								<button
									key={category}
									type="button"
									onClick={() => handleSelectSuggestion(category)}
									className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
								>
									{category}
								</button>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

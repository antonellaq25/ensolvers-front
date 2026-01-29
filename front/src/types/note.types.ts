export interface Category {
	id: number
	name: string
}

export interface Note {
	id: number
	title: string
	content: string
	isArchived: boolean
	categories: Category[]
}

export interface CreateNotePayload {
	title: string
	content: string
	categories?: number[] 
}

export interface UpdateNotePayload {
	id: number
	title?: string
	content?: string
	isArchived?: boolean
	categories?: number[]
}

export interface FilterNotesParams {
	page?: number
	limit?: number
	title?: string
	categories?: number[]
}

export interface FilterNotesResponse {
	total: number
	page: number
	pages: number
	notes: Note[]
}
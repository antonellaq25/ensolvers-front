export interface Note {
	id: number
	title: string
	content: string
	isArchived: boolean
	categories: string[]
}

export interface CreateNotePayload {
	title: string
	content: string
	categories?: string[]
}

export interface UpdateNotePayload {
	id: number
	title?: string
	content?: string
	isArchived?: boolean
	categories?: string[]
}

export interface FilterNotesParams {
	page?: number
	limit?: number
	title?: string
	categories?: string[]
}

export interface FilterNotesResponse {
	total: number
	page: number
	pages: number
	notes: Note[]
}
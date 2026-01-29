import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { notesApi } from '../../services/api'
import type { Note, CreateNotePayload, UpdateNotePayload, FilterNotesParams } from '../../types/note.types'

interface NotesState {
	notes: Note[]
	selectedNote: Note | null
	loading: boolean
	error: string | null
	showArchived: boolean

	currentPage: number
	totalPages: number
	totalNotes: number
}


const initialState: NotesState = {
	notes: [],
	selectedNote: null,
	loading: false,
	error: null,
	showArchived: false,
	currentPage: 1,
	totalPages: 1,
	totalNotes: 0,
}


export const fetchNotes = createAsyncThunk(
	'notes/fetchNotes',
	async (_, { rejectWithValue }) => {
		try {
			const response = await notesApi.getAllNotes()
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch notes')
		}
	}
)

export const filterNotes = createAsyncThunk(
	'notes/filterNotes',
	async (params: FilterNotesParams, { rejectWithValue }) => {
		try {
			const response = await notesApi.filterNotes(params)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to filter notes')
		}
	}
)

export const createNote = createAsyncThunk(
	'notes/createNote',
	async (data: CreateNotePayload, { rejectWithValue }) => {
		try {
			const response = await notesApi.createNote(data)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to create note')
		}
	}
)

export const updateNote = createAsyncThunk(
	'notes/updateNote',
	async (data: UpdateNotePayload, { rejectWithValue }) => {
		try {
			const { id, ...updateData } = data
			const response = await notesApi.updateNote(id, updateData)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to update note')
		}
	}
)

export const deleteNote = createAsyncThunk(
	'notes/deleteNote',
	async (id: number, { rejectWithValue }) => {
		try {
			await notesApi.deleteNote(id)
			return id
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to delete note')
		}
	}
)

export const archiveNote = createAsyncThunk(
	'notes/archiveNote',
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await notesApi.archiveNote(id)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to archive note')
		}
	}
)

export const unarchiveNote = createAsyncThunk(
	'notes/unarchiveNote',
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await notesApi.unarchiveNote(id)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to unarchive note')
		}
	}
)


const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {

		setSelectedNote: (state, action: PayloadAction<Note | null>) => {
			state.selectedNote = action.payload
		},
		clearError: (state) => {
			state.error = null
		},
		toggleShowArchived: (state) => {
			state.showArchived = !state.showArchived
		},
	},
	extraReducers: (builder) => {

		builder
			.addCase(fetchNotes.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchNotes.fulfilled, (state, action) => {
				state.loading = false
				state.notes = action.payload
			})
			.addCase(fetchNotes.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})


		builder
			.addCase(filterNotes.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(filterNotes.fulfilled, (state, action) => {
				state.loading = false
				state.notes = action.payload.notes
				state.currentPage = action.payload.page
				state.totalPages = action.payload.pages
				state.totalNotes = action.payload.total
			})
			.addCase(filterNotes.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})

		builder
			.addCase(createNote.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(createNote.fulfilled, (state, action) => {
				state.loading = false
				state.notes.unshift(action.payload)
				state.selectedNote = action.payload
			})
			.addCase(createNote.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})

		builder
			.addCase(updateNote.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(updateNote.fulfilled, (state, action) => {
				state.loading = false
				const index = state.notes.findIndex(note => note.id === action.payload.id)
				if (index !== -1) {
					state.notes[index] = action.payload
				}
				if (state.selectedNote?.id === action.payload.id) {
					state.selectedNote = action.payload
				}
			})
			.addCase(updateNote.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})

		builder
			.addCase(deleteNote.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteNote.fulfilled, (state, action) => {
				state.loading = false
				state.notes = state.notes.filter(note => note.id !== action.payload)
				if (state.selectedNote?.id === action.payload) {
					state.selectedNote = null
				}
			})
			.addCase(deleteNote.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})

		builder
			.addCase(archiveNote.fulfilled, (state, action) => {
				const index = state.notes.findIndex(note => note.id === action.payload.id)
				if (index !== -1) {
					state.notes[index] = action.payload
				}
				if (state.selectedNote?.id === action.payload.id) {
					state.selectedNote = action.payload
				}
			})

		builder
			.addCase(unarchiveNote.fulfilled, (state, action) => {
				const index = state.notes.findIndex(note => note.id === action.payload.id)
				if (index !== -1) {
					state.notes[index] = action.payload
				}
				if (state.selectedNote?.id === action.payload.id) {
					state.selectedNote = action.payload
				}
			})
	},
})

export const { setSelectedNote, clearError, toggleShowArchived } = notesSlice.actions
export default notesSlice.reducer

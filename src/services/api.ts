import axios from 'axios'


export const api = axios.create({
	baseURL: 'http://localhost:3000/api', 
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error('API Error:', error.response?.data || error.message)
		return Promise.reject(error)
	}
)


export const notesApi = {
	getAllNotes: () => api.get('/notes'),

	filterNotes: (params: {
		page?: number
		limit?: number
		title?: string
		categories?: string[]
	}) => api.get('/notes/filter', { params }),


	createNote: (data: { title: string; content: string; categories?: string[] }) =>
		api.post('/notes', data),

	updateNote: (id: number, data: { title?: string; content?: string; isArchived?: boolean; addCategories?: string[]; removeCategories?: string[] }) =>
		api.put(`/notes/${id}`, data),

	deleteNote: (id: number) => api.delete(`/notes/${id}`),

	archiveNote: (id: number) => api.patch(`/notes/${id}/archive`),

	unarchiveNote: (id: number) => api.patch(`/notes/${id}/unarchive`),
}
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

const Note = z.object({
	_id: z.string(),
	title: z.string().min(1),
	content: z.string().min(1),
	createdAt: z.string(),
	updatedAt: z.string()
});

export type Note = z.infer<typeof Note>;
type NoteFormData = Pick<Note, 'title' | 'content' | '_id'>;
const NoteList = z.array(Note);

const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

// GET fetch all notes
async function getNotes(): Promise<Note[]> {
	try {
		const res = await fetch(`${API_BASE}/notes`, { credentials: 'include' });
		if (!res.ok) {
			const err = new Error(`HTTP ${res.status}`) as Error & {
				status?: number;
			};
			err.status = res.status;
			throw err;
		}
		const data = await res.json();
		return NoteList.parse(data);
	} catch (error) {
		toast.error(`Error fetching notes`);
		throw error;
	}
}

// POST create a note
async function createNote(title: string, content: string): Promise<Note> {
	const res = await fetch(`${API_BASE}/notes`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title, content })
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const data = await res.json();
	return Note.parse(data);
}

// GET fetch a note by id
async function getNoteById(id: string): Promise<Note> {
	const res = await fetch(`${API_BASE}/notes/${id}`, {
		credentials: 'include'
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const data = await res.json();
	return Note.parse(data);
}

// DELETE delete a note by id
async function deleteNoteById(id: string): Promise<void> {
	const res = await fetch(`${API_BASE}/notes/${id}`, {
		method: 'DELETE'
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return;
}

// UPDATE update a note by id
async function updateNoteById(note: NoteFormData): Promise<Note> {
	const res = await fetch(`${API_BASE}/notes/${note._id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title: note.title, content: note.content })
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const data = await res.json();
	return Note.parse(data);
}

/* ===================================
	 REACT QUERY HOOKS
	 =========================== */

// HOOK fetch notes
export function useNotes() {
	const q = useQuery({
		queryKey: ['notes'],
		queryFn: getNotes,
		retry: false,
		refetchOnWindowFocus: false,
		placeholderData: (prev) => prev ?? undefined
	});

	const error = q.error as Error & { status?: number };
	const isRateLimited = error?.status === 429;

	return { ...q, isRateLimited };
}

// HOOK fetch a note by id
export function useNote(id: string | undefined) {
	return useQuery({
		queryKey: ['note', id],
		queryFn: () => getNoteById(id!),
		enabled: !!id
	});
}

// HOOK create a note
export function useCreateNote() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ title, content }: { title: string; content: string }) =>
			createNote(title, content),
		onSuccess: ({ _id }) => {
			// Invalidate and refetch
			qc.invalidateQueries({ queryKey: ['notes'] });
			toast.success('Note created!');
			navigate(`/note/${_id}`);
		}
	});
}

// HOOK delete a note by id
export function useDeleteNote() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteNoteById(id),
		onSuccess: () => {
			// Invalidate and refetch
			qc.invalidateQueries({ queryKey: ['notes'] });
			toast.success('Note deleted!');
			navigate('/');
		}
	});
}

// HOOK update a note by id
export function useUpdateNote() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (note: NoteFormData) => updateNoteById(note),
		onSuccess: () => {
			// Invalidate and refetch
			qc.invalidateQueries({ queryKey: ['notes'] });
			toast.success('Note updated!');
		}
	});
}

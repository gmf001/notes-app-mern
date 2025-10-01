import { useDeleteNote, type Note } from '@/lib/api';
import { Trash } from 'lucide-react';
import { Link } from 'react-router';
import EditNote from './edit-note';

function NoteCard({ note }: { note: Note }) {
	const { mutate: deleteNote } = useDeleteNote();

	return (
		<div key={note._id} className='p-4 border rounded-md'>
			<Link to={`/note/${note._id}`} className='block group'>
				<h2 className='text-lg font-semibold transition-colors group-hover:text-emerald-300 truncate'>
					{note.title}
				</h2>
				<p className='mt-2 text-foreground text-sm line-clamp-3'>
					{note.content}
				</p>
			</Link>

			<div className='mt-4 flex justify-between items-center'>
				<span className='text-xs text-muted-foreground'>
					{new Date(note.createdAt).toLocaleDateString()}
				</span>

				<div className='gap-2 flex items-center z-10 w-full justify-end'>
					<EditNote note={note} />
					<Trash
						onClick={() => deleteNote(note._id)}
						className='w-4 h-4 text-muted-foreground hover:text-red-300 cursor-pointer'
					/>
				</div>
			</div>
		</div>
	);
}

export default NoteCard;

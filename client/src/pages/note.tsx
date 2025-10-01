import { useNote } from '@/lib/api';
import { Navigate, useParams } from 'react-router';

function Note() {
	const { id } = useParams<{ id: string }>();
	const { data: note, isPending } = useNote(id);

	// redirect to home if note not found
	if (!isPending && !note) {
		return <Navigate to='/' />;
	}

	return (
		<div className='max-w-6xl mx-auto mt-6 px-3 sm:px-6 gap-6 flex flex-col w-full'>
			<h2 className='text-2xl text-emerald-400 font-bold'>{note?.title}</h2>
			<p>{note?.content}</p>
		</div>
	);
}

export default Note;

import NoteCard from '@/components/note-card';
import RateLimit from '@/components/rate-limit';
import { useNotes } from '@/lib/api';

function Home() {
	const { data, isRateLimited, isSuccess } = useNotes();

	if (isRateLimited) {
		return (
			<div className='max-w-6xl mx-auto mt-6 px-3 sm:px-6'>
				<RateLimit show={isRateLimited} />
			</div>
		);
	}

	if (isSuccess && data?.length === 0) {
		return (
			<div className='max-w-6xl mx-auto mt-6 px-3 sm:px-6'>
				<p className='text-center text-gray-500 dark:text-gray-400'>
					No notes found. Create one to get started!
				</p>
			</div>
		);
	}

	return (
		<div className='max-w-6xl mx-auto mt-6 px-3 sm:px-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{data?.map((note) => (
					<NoteCard key={note._id} note={note} />
				))}
			</div>
		</div>
	);
}

export default Home;

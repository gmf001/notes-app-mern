import { Link } from 'react-router';
import CreateNoteDialog from './create-note';

function Navbar() {
	return (
		<header className='border-b mb-4 lg:mb-12'>
			<div className='max-w-6xl mx-auto py-3 px-3 sm:px-6 flex justify-between items-center'>
				<Link to='/'>
					<h1 className='text-2xl font-bold text-emerald-400'>Notes</h1>
				</Link>

				<CreateNoteDialog />
			</div>
		</header>
	);
}

export default Navbar;

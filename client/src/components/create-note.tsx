import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from './ui/dialog';
import { useState } from 'react';
import { NoteForm, type NoteFormValues } from './note-form';
import { useCreateNote } from '@/lib/api';

function CreateNote() {
	const [open, setOpen] = useState(false);
	const { mutate: createNote } = useCreateNote();

	const handleSubmit = async (values: NoteFormValues) => {
		await createNote(values);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer gap-2'>
					<Plus className='h-4 w-4' />
					Create Note
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-xl text-emerald-300'>
						Create Note
					</DialogTitle>
				</DialogHeader>

				<div className='my-2'>
					<NoteForm onSubmit={handleSubmit} />
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default CreateNote;

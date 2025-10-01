import { Edit } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from './ui/dialog';
import { NoteForm, type NoteFormValues } from './note-form';
import { useState } from 'react';
import { useUpdateNote } from '@/lib/api';

type Props = {
	note: NoteFormValues & { _id: string };
};

function EditNote({ note }: Props) {
	const [open, setOpen] = useState(false);
	const { mutate: updateNote } = useUpdateNote();

	const handleSubmit = async (values: NoteFormValues) => {
		await updateNote({ ...values, _id: note._id });
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Edit className='w-4 h-4 text-muted-foreground hover:text-blue-300 cursor-pointer' />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-emerald-300 text-xl'>
						Edit Note
					</DialogTitle>
				</DialogHeader>

				<div className='my-2'>
					<NoteForm
						initialValues={{ title: note.title, content: note.content }}
						onSubmit={handleSubmit}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default EditNote;

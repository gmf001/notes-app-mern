// NoteForm.tsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	content: z.string().min(1, 'Content is required')
});

export type NoteFormValues = z.infer<typeof formSchema>;

type NoteFormProps = {
	initialValues?: Partial<NoteFormValues>;
	onSubmit: (values: NoteFormValues) => Promise<void> | void;
};

export function NoteForm({ initialValues, onSubmit }: NoteFormProps) {
	const form = useForm<NoteFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: { title: '', content: '', ...initialValues }
	});

	// If initialValues arrive async (editing), sync them into the form
	useEffect(() => {
		if (initialValues) form.reset({ title: '', content: '', ...initialValues });
	}, [initialValues, form]);

	const handleSubmit = async (values: NoteFormValues) => {
		await onSubmit(values);
	};

	const isSubmitting = form.formState.isSubmitting;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									className='focus-visible:ring-0 focus-visible:ring-offset-0'
									autoFocus
									placeholder='Enter your title...'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<Textarea
									className='focus-visible:ring-0 focus-visible:ring-offset-0'
									placeholder='Enter your content...'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex w-full justify-end gap-2'>
					<Button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Saving...' : 'Save'}
					</Button>
				</div>
			</form>
		</Form>
	);
}

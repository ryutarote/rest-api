import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import useStore from '@/store';
import { useMutateTask } from '@/hooks/useMutateTask';
import { useForm } from 'react-hook-form';
import { EditedTask } from '@/types';

const TaskForm = () => {
	const { editedTask } = useStore();
	const update = useStore((state) => state.updateEditedTask);
	const { createTaskMutation, updateTaskMutation } = useMutateTask();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<EditedTask>({
		defaultValues: editedTask,
	});

	const fetchTask = async () => {
		return editedTask;
	};

	useQuery<EditedTask, Error>({
		queryKey: ['task', editedTask.id],
		queryFn: fetchTask,
		enabled: editedTask.id !== undefined,
		initialData: editedTask,
		onSuccess: (data: EditedTask) => {
			reset(data);
		},
	} as UseQueryOptions<EditedTask, Error, EditedTask>);

	const onSubmit = (data: Omit<EditedTask, 'id'>) => {
		if (editedTask.id === 0) {
			createTaskMutation.mutate(data, {
				onSuccess: () => {
					update({ id: 0, title: '', description: '', completed: false });
					reset({ title: '', description: '', completed: false });
				},
			});
		} else {
			updateTaskMutation.mutate(
				{ ...data, id: editedTask.id },
				{
					onSuccess: () => {
						update({ id: 0, title: '', description: '', completed: false });
						reset({ title: '', description: '', completed: false });
					},
				}
			);
		}
	};

	return (
		<div className='w-full p-4 bg-white rounded-lg shadow-lg'>
			<h1 className='text-2xl font-bold text-center mb-6'>TODO アプリ</h1>
			<h2 className='text-xl text-black font-bold mb-4'>
				{editedTask.id === 0 ? 'タスクを作成' : 'タスクを編集'}
			</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-4'>
					<label
						htmlFor='title'
						className='block text-sm font-medium text-gray-700'
					>
						やること
					</label>
					<input
						id='title'
						{...register('title', { required: '必須項目です' })}
						className='mt-1 block w-full p-2 bg-black text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
					{errors.title && (
						<p className='text-red-500 text-xs mt-1'>{errors.title.message}</p>
					)}
				</div>
				<div className='flex justify-end'>
					<button
						type='submit'
						className='bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						{editedTask.id === 0 ? '新規作成' : '編集'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default TaskForm;

// TaskItem.tsx
import { FC, useCallback, useEffect, useState } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { Task } from '@prisma/client';
import useStore from '@/store';
import { useMutateTask } from '@/hooks/useMutateTask';

export const TaskItem: FC<Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>> = ({
	id,
	title,
	description,
	completed,
}) => {
	const update = useStore((state) => state.updateEditedTask);
	const { deleteTaskMutation, updateTaskMutation } = useMutateTask();
	const [isCompleted, setIsCompleted] = useState(completed ?? false);

	useEffect(() => {
		setIsCompleted(completed ?? false);
	}, [completed]);

	const handleCheckClick = useCallback(() => {
		const newCompletedStatus = !isCompleted;
		setIsCompleted(newCompletedStatus);
		updateTaskMutation.mutate({
			id,
			title,
			description,
			completed: newCompletedStatus,
		});
	}, [isCompleted, id, title, description, updateTaskMutation]);

	const handleEditClick = useCallback(() => {
		update({
			id,
			title,
			description,
			completed: !completed,
		});
	}, [id, title, description, completed, update]);

	const handleDeleteClick = useCallback(() => {
		deleteTaskMutation.mutate(id);
	}, [id, deleteTaskMutation]);

	return (
		<div className='flex items-center justify-between p-4 bg-white rounded-lg shadow-md'>
			<div className='flex items-center'>
				<input
					type='checkbox'
					className='form-checkbox h-5 w-5 text-indigo-600'
					checked={isCompleted}
					onChange={handleCheckClick}
				/>
				<div className='ml-4'>
					<h2
						className={`text-lg font-bold ${
							isCompleted ? 'line-through text-gray-400' : 'text-gray-900'
						}`}
					>
						{title}
					</h2>
					<p className={`text-gray-500 ${isCompleted ? 'line-through' : ''}`}>
						{description}
					</p>
				</div>
			</div>
			<div className='flex space-x-2'>
				<PencilAltIcon
					className='h-5 w-5 cursor-pointer text-blue-500'
					onClick={handleEditClick}
				/>
				<TrashIcon
					className='h-5 w-5 cursor-pointer text-red-500'
					onClick={handleDeleteClick}
				/>
			</div>
		</div>
	);
};

export default TaskItem;

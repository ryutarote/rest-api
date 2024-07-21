import { useQueryTasks } from '@/hooks/useQueryTasks';
import { TaskItem } from './TaskItem';
import { EditedTask } from '@/types';
import LoadingOverlay from './LoadingOverlay';
import { Suspense } from 'react';

export const TaskList = () => {
	const { data: tasks } = useQueryTasks() as {
		data: EditedTask[];
	};

	return (
		<div className='w-full p-4 bg-white rounded-lg shadow-lg'>
			<ul className='w-full space-y-4'>
				<Suspense fallback={<LoadingOverlay />}>
					{tasks?.map((task: EditedTask) => (
						<TaskItem
							key={task.id}
							id={task.id}
							title={task.title}
							description={task.description}
							completed={task.completed}
						/>
					))}
					{tasks?.length === 0 && (
						<li className='text-gray-500 text-sm'>タスクはまだありません</li>
					)}
				</Suspense>
			</ul>
		</div>
	);
};

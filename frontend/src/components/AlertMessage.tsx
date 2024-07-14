import React from 'react';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/solid';

interface AlertMessageProps {
	type: 'error' | 'success';
	message: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, message }) => {
	const icon =
		type === 'error' ? (
			<ExclamationCircleIcon className='w-5 h-5 inline mr-2' />
		) : (
			<CheckCircleIcon className='w-5 h-5 inline mr-2' />
		);
	const color = type === 'error' ? 'red' : 'green';
	return (
		<div
			className={`bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded relative`}
			role='alert'
		>
			{icon}
			<div className='block sm:inline'>{message}</div>
		</div>
	);
};

export default AlertMessage;

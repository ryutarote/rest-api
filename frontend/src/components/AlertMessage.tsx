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

	const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
	const borderColor = type === 'error' ? 'border-red-400' : 'border-green-400';
	const textColor = type === 'error' ? 'text-red-700' : 'text-green-700';

	return (
		<div
			className={`${bgColor} ${borderColor} ${textColor} px-4 py-3 rounded relative`}
			role='alert'
		>
			{icon}
			<div className='block sm:inline'>{message}</div>
		</div>
	);
};

export default AlertMessage;

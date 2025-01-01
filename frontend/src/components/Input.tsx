import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ id, label, ...props }, ref) => (
		<div className='mb-4'>
			{label && (
				<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
					{label}
				</label>
			)}
			<input
				id={id}
				ref={ref}
				{...props}
				className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
			/>
		</div>
	)
);

Input.displayName = 'Input';

export default Input;

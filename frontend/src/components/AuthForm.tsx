import React from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface AuthFormProps {
	isRegister: boolean;
	form: UseFormReturn<{ email: string; password: string }>;
	onSubmit: () => void;
	toggleRegister: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
	isRegister,
	form,
	onSubmit,
	toggleRegister,
}) => {
	return (
		<>
			<form className='mt-8 space-y-6' onSubmit={onSubmit}>
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						メールアドレス
					</label>
					<input
						id='email'
						type='email'
						required
						className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1'
						placeholder='example@gmail.com'
						{...form.register('email')}
					/>
					{form.formState.errors.email && (
						<p className='text-red-500 text-xs mt-1'>
							{form.formState.errors.email.message}
						</p>
					)}
				</div>
				<div>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700'
					>
						パスワード
					</label>
					<input
						id='password'
						type='password'
						required
						className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1'
						placeholder='パスワード'
						{...form.register('password')}
					/>
					{form.formState.errors.password && (
						<p className='text-red-500 text-xs mt-1'>
							{form.formState.errors.password.message}
						</p>
					)}
				</div>
				<button
					type='button'
					className='text-sm text-indigo-600 hover:text-indigo-500 mt-2 block'
					onClick={toggleRegister}
				>
					{isRegister
						? 'アカウントをお持ちですか？ ログイン'
						: 'アカウントをお持ちでないですか？ 登録'}
				</button>
				<button
					type='submit'
					className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4'
				>
					{isRegister ? '登録' : 'ログイン'}
				</button>
			</form>
		</>
	);
};

export default AuthForm;

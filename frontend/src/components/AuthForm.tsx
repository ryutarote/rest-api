import { FC } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

interface AuthFormProps<TFormValues extends FieldValues> {
	isRegister: boolean;
	form: UseFormReturn<TFormValues>;
	onSubmit: () => void;
	toggleRegister: () => void;
}

const AuthForm: FC<AuthFormProps<{ email: string; password: string }>> = ({
	isRegister,
	form,
	onSubmit,
	toggleRegister,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<div className='mb-4'>
				<label className='block text-gray-700 mb-2' htmlFor='email'>
					メールアドレス
				</label>
				<input
					{...form.register('email')}
					className='w-full p-2 border border-gray-300 bg-white text-black rounded'
					id='email'
					type='email'
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-700 mb-2' htmlFor='password'>
					パスワード
				</label>
				<input
					{...form.register('password')}
					className='w-full p-2 bg-white text-black border border-gray-300 rounded'
					id='password'
					type='password'
				/>
			</div>
			<button
				type='submit'
				className='w-full bg-blue-500 text-white p-2 rounded'
			>
				{isRegister ? 'サインアップ' : 'ログイン'}
			</button>
			<button
				type='button'
				onClick={toggleRegister}
				className='w-full bg-gray-500 text-white p-2 rounded mt-2'
			>
				{isRegister ? 'ログインへ' : 'サインアップへ'}
			</button>
		</form>
	);
};

export default AuthForm;

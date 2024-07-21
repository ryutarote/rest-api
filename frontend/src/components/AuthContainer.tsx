import React from 'react';
import LoadingOverlay from '@/components/LoadingOverlay';
import AlertMessage from '@/components/AlertMessage';

interface AuthContainerProps {
	loading: boolean;
	isRegister: boolean;
	error: string | null;
	success: boolean;
	children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
	loading,
	isRegister,
	error,
	success,
	children,
}) => {
	return (
		<div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg relative'>
			{loading && <LoadingOverlay />}
			<h2 className='text-2xl font-bold text-black text-center'>
				{isRegister ? 'ユーザー登録' : 'ログイン'}
			</h2>
			{error && <AlertMessage type='error' message={error} />}
			{success && (
				<AlertMessage type='success' message={`ユーザー登録が完了しました!`} />
			)}
			{children}
		</div>
	);
};

export default AuthContainer;

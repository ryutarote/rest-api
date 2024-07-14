import React, { Suspense } from 'react';
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
		<div className='sm:mx-auto sm:w-full sm:max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg relative'>
			<Suspense fallback={<LoadingOverlay />}>
				{loading && <LoadingOverlay />}
				<h2 className='text-2xl font-bold text-center'>
					{isRegister ? 'ユーザー登録' : 'ログイン'}
				</h2>
				{error && <AlertMessage type='error' message={error} />}
				{success && (
					<AlertMessage
						type='success'
						message={`ユーザー登録が完了しました!`}
					/>
				)}
				{children}
			</Suspense>
		</div>
	);
};

export default AuthContainer;

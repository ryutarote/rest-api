import { Suspense } from 'react';
import { useQueryUser } from '../hooks/useQueryUser';
import LoadingOverlay from '@/components/LoadingOverlay';

export const UserInfo = () => {
	const { data: user, status } = useQueryUser();
	if (status === 'error') return <p>エラーが発生しました</p>;
	return (
		<div className='text-center mb-4'>
			<Suspense fallback={<LoadingOverlay />}>
				<p className='text-xl font-semibold'>アカウント: {user?.email}</p>
			</Suspense>
		</div>
	);
};

import { Suspense } from 'react';
import { useQueryUser } from '../hooks/useQueryUser';
import LoadingOverlay from '@/components/LoadingOverlay';

export const UserInfo = () => {
	const { data: user, status } = useQueryUser();
	if (status === 'error') return <p>エラーが発生しました</p>;
	return (
		<div>
			<Suspense fallback={<LoadingOverlay />}>
				<p>メールアドレス: {user?.email}</p>
			</Suspense>
		</div>
	);
};

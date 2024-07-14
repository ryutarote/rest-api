import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { LogoutIcon } from '@heroicons/react/solid';
import { Layout } from '../components/Layout';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/components/UserInfo';

const Dashboard: NextPage = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const logout = async () => {
		queryClient.removeQueries({ queryKey: 'user' });
		await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
		router.push('/');
	};
	return (
		<Layout title='TODO リスト'>
			<div className='container mx-auto py-8'>
				<LogoutIcon
					className='mb-6 h-6 w-6 cursor-pointer text-blue-500'
					onClick={logout}
				/>
				<UserInfo />
			</div>
		</Layout>
	);
};

export default Dashboard;

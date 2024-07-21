import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { LogoutIcon } from '@heroicons/react/solid';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/components/UserInfo';
import { TaskList } from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import Head from 'next/head';

const Dashboard: NextPage = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const logout = async () => {
		queryClient.removeQueries({ queryKey: ['user'] });
		await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
		router.push('/');
	};
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-800 to-blue-900 text-white'>
			<h1 className='text-2xl font-bold text-center mb-6'>TODO アプリ</h1>
			<div className='container mx-auto py-8 flex flex-col items-center'>
				<div className='w-full max-w-lg'>
					<TaskForm />
					<div className='mt-8'>
						<TaskList />
					</div>
				</div>
				<div className='mt-8'>
					<UserInfo />
				</div>
				<div className='flex flex-col justify-between items-center mt-2'>
					<button
						onClick={logout}
						className='flex items-center gap-1 text-red-500'
					>
						<LogoutIcon className='h-5 w-5' />
						ログアウト
					</button>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import AuthForm from '@/components/AuthForm';
import AuthContainer from '@/components/AuthContainer';
import Head from 'next/head';

const schema = zod.object({
	email: zod.string().email({ message: '無効なメールアドレスです' }),
	password: zod
		.string()
		.min(5, { message: 'パスワードは5文字以上でなければなりません' }),
});

const Home: NextPage = () => {
	const router = useRouter();
	const [isRegister, setIsRegister] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const form = useForm<{ email: string; password: string }>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const handleSubmit = async (data: { email: string; password: string }) => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const url = isRegister
				? `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`
				: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
			const response = await axios.post(url, data);

			if (isRegister) {
				await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data);
			}
			form.reset();
			router.push('/dashboard');
		} catch (e: any) {
			setError(e.response?.data?.message || 'エラーが発生しました');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-800 to-blue-900 text-white'>
			<div className='min-h-screen w-full container mt-4 py-8 flex flex-col items-center justify-center'>
				<h1 className='text-2xl font-bold text-center mb-6'>TODO アプリ</h1>
				<div className='flex items-center'>
					<AuthContainer
						loading={loading}
						isRegister={isRegister}
						error={error}
						success={success}
					>
						<AuthForm
							isRegister={isRegister}
							form={form}
							onSubmit={form.handleSubmit(handleSubmit)}
							toggleRegister={() => setIsRegister(!isRegister)}
						/>
					</AuthContainer>
				</div>
			</div>
		</div>
	);
};

export default Home;

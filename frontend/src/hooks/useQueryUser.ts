import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { User } from '@prisma/client';

type UserWithoutPassword = Omit<User, 'password'>;

export const useQueryUser = (): UseQueryResult<UserWithoutPassword, Error> => {
	const router = useRouter();
	const getUser = async (): Promise<UserWithoutPassword> => {
		const { data } = await axios.get<Omit<User, 'password'>>(
			`${process.env.NEXT_PUBLIC_API_URL}/user`
		);
		return data;
	};

	const query = useQuery<UserWithoutPassword, Error, UserWithoutPassword>({
		queryKey: ['user'],
		queryFn: getUser,
	});

	if (query.error) {
		const axiosError = query.error as AxiosError;
		if (
			axiosError.response?.status === 401 ||
			axiosError.response?.status === 403
		) {
			router.push('/');
		}
	}

	return query;
};

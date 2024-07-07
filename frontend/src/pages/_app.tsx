import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { theme } from '@/components/theme';
import { useEffect } from 'react';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

export default function App({ Component, pageProps }: AppProps) {
	axios.defaults.withCredentials = true;
	useEffect(() => {
		const getCsrfToken = async () => {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
			);
			axios.defaults.headers.common['csrf-token'] = data.csrfToken;
		};
		getCsrfToken();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme}>
				<Head>
					<title>Mantine Template</title>
					<meta
						name='viewport'
						content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
					/>
					<link rel='shortcut icon' href='/favicon.svg' />
				</Head>
				<Component {...pageProps} />
			</MantineProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

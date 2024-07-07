import Head from 'next/head';

type Props = {
	title: string;
	children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ title, children }) => {
	return (
		<div className='mx-auto max-w-7xl  flex flex-col items-center  justify-center px-4 sm:px-6 lg:px-8'>
			<Head>
				<title>{title}</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
				/>
				<link rel='shortcut icon' href='/favicon.svg' />
			</Head>
			<header className='py-6'>
				<h1 className='text-3xl font-bold'>{title}</h1>
			</header>
			<main>{children}</main>
		</div>
	);
};

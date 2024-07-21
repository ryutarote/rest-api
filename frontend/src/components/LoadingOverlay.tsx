import React from 'react';

const LoadingOverlay: React.FC = () => (
	<div className='absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center'>
		読み込み中...
	</div>
);

export default LoadingOverlay;

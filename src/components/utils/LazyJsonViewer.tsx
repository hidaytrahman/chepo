import { useMockDataset } from '../../hooks/useMockDataset';
import JsonViewer from './jsonViewer/JsonViewer';

type LazyJsonViewerProps = {
	datasetKey: string;
	title: string;
};

function LazyJsonViewer({ datasetKey, title }: LazyJsonViewerProps) {
	const { data, loading, error } = useMockDataset(datasetKey);

	if (loading) {
		return (
			<section className='json-view-wrapper'>
				<h3 className='title text-gray-600'>{title}</h3>
				<div className='mt-4 flex items-center gap-2 text-sm text-gray-500'>
					<span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600' />
					Loading dataset…
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className='json-view-wrapper'>
				<h3 className='title text-gray-600'>{title}</h3>
				<p className='mt-2 text-sm text-red-600'>Failed to load dataset: {error.message}</p>
			</section>
		);
	}

	if (!data || typeof data !== 'object') {
		return null;
	}

	return <JsonViewer data={data as object} title={title} />;
}

export default LazyJsonViewer;

import { useState } from 'react';
import JsonViewer from './jsonViewer/JsonViewer';
import SchemaViewer from './schema/SchemaViewer';

type ViewMode = 'data' | 'schema';

type DatasetViewerProps = {
	data: object;
	title: string;
	datasetKey: string;
};

function DatasetViewer({ data, title, datasetKey }: DatasetViewerProps) {
	const [view, setView] = useState<ViewMode>('data');

	return (
		<section className='json-view-wrapper'>
			<div className='mb-4 flex flex-wrap items-center gap-2'>
				<button
					type='button'
					onClick={() => setView('data')}
					className={`rounded-lg px-4 py-2 text-sm font-medium ring-1 transition-colors ${
						view === 'data'
							? 'bg-gray-900 text-white ring-gray-900'
							: 'bg-white text-gray-600 ring-gray-200 hover:bg-gray-50'
					}`}
				>
					Mock data
				</button>
				<button
					type='button'
					onClick={() => setView('schema')}
					className={`rounded-lg px-4 py-2 text-sm font-medium ring-1 transition-colors ${
						view === 'schema'
							? 'bg-indigo-600 text-white ring-indigo-600'
							: 'bg-white text-gray-600 ring-gray-200 hover:bg-gray-50'
					}`}
				>
					Schema
				</button>
			</div>

			{view === 'data' ? (
				<JsonViewer data={data} title={title} />
			) : (
				<div>
					<h3 className='title text-gray-600'>{title}</h3>
					<span className='short-text mt-2 block'>
						Inferred schema — copy in your preferred format.
					</span>
					<SchemaViewer data={data} datasetKey={datasetKey} />
				</div>
			)}
		</section>
	);
}

export default DatasetViewer;

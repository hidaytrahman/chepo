import { useState } from 'react';
import { BracketsCurly, Code } from 'phosphor-react';
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
			<div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
				<h3 className='title text-slate-800'>{title}</h3>
				<div className='inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1'>
					<button
						type='button'
						onClick={() => setView('data')}
						className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition ${
							view === 'data'
								? 'bg-white text-slate-900 shadow-sm'
								: 'text-slate-500 hover:text-slate-700'
						}`}
					>
						<BracketsCurly size={16} weight={view === 'data' ? 'fill' : 'regular'} />
						Mock data
					</button>
					<button
						type='button'
						onClick={() => setView('schema')}
						className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition ${
							view === 'schema'
								? 'bg-indigo-600 text-white shadow-sm'
								: 'text-slate-500 hover:text-slate-700'
						}`}
					>
						<Code size={16} weight={view === 'schema' ? 'fill' : 'regular'} />
						Schema
					</button>
				</div>
			</div>

			{view === 'data' ? (
				<JsonViewer data={data} title='' />
			) : (
				<>
					<span className='short-text mt-2 block'>
						Inferred schema — copy in TypeScript, Zod, PostgreSQL, and more.
					</span>
					<SchemaViewer data={data} datasetKey={datasetKey} />
				</>
			)}
		</section>
	);
}

export default DatasetViewer;

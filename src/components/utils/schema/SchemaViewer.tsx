import { useMemo, useState } from 'react';
import Highlight from 'react-highlight';
import { generateSchema, SCHEMA_FORMATS, type SchemaFormat } from '../../../utils/schema';
import { CopyButton } from '../copy/Copy';
import '../jsonViewer/JsonViewer.css';

type SchemaViewerProps = {
	data: object;
	datasetKey: string;
};

function SchemaViewer({ data, datasetKey }: SchemaViewerProps) {
	const [format, setFormat] = useState<SchemaFormat>('typescript');

	const activeFormat = SCHEMA_FORMATS.find((item) => item.id === format) ?? SCHEMA_FORMATS[0];

	const schemaText = useMemo(
		() => generateSchema(data, format, datasetKey),
		[data, format, datasetKey],
	);

	return (
		<div className='mt-6'>
			<div className='mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<h4 className='text-sm font-semibold text-gray-700'>Schema variants</h4>
					<p className='text-xs text-gray-500'>{activeFormat.description}</p>
				</div>
				<div className='flex flex-wrap gap-1.5'>
					{SCHEMA_FORMATS.map((item) => (
						<button
							key={item.id}
							type='button'
							onClick={() => setFormat(item.id)}
							className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition-colors ${
								format === item.id
									? 'bg-indigo-600 text-white ring-indigo-600'
									: 'bg-white text-gray-600 ring-gray-200 hover:bg-gray-50'
							}`}
						>
							{item.label}
						</button>
					))}
				</div>
			</div>

			<article className='json-view mt-1'>
				<header className='json-view__header'>
					<CopyButton text={schemaText} />
				</header>
				{/* @ts-ignore */}
				<Highlight language={activeFormat.language}>{schemaText}</Highlight>
			</article>
		</div>
	);
}

export default SchemaViewer;

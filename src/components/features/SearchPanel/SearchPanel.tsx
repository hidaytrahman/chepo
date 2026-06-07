import { useMemo } from 'react';
import { getRegistryEntry } from '../../../model';
import { getMockDataByKey, searchCatalog } from '../../../utils/search.utils';
import ModelBrowser from '../../utils/ModelBrowser';
import JsonViewer from '../../utils/jsonViewer/JsonViewer';

const DEFAULT_KEY = 'videoPlayer';

function SearchPanel({
	searchTerm,
	setSearchTerm,
	selectedKey,
	setSelectedKey,
}: {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	selectedKey: string;
	setSelectedKey: (value: string) => void;
}) {
	const matches = useMemo(() => searchCatalog(searchTerm), [searchTerm]);

	const resolvedKey = useMemo(() => {
		if (
			selectedKey &&
			(!searchTerm || searchTerm.toLowerCase() === selectedKey.toLowerCase()) &&
			getMockDataByKey(selectedKey)
		) {
			return selectedKey;
		}
		const exact = matches.find((m) => m.key.toLowerCase() === searchTerm.toLowerCase());
		return exact?.key || matches[0]?.key || DEFAULT_KEY;
	}, [selectedKey, searchTerm, matches]);

	const entry = getRegistryEntry(resolvedKey);
	const data = getMockDataByKey(resolvedKey) ?? getMockDataByKey(DEFAULT_KEY);
	const displayTitle = entry ? `${entry.title} (${entry.key})` : resolvedKey;

	const handleSelect = (key: string) => {
		setSelectedKey(key);
		setSearchTerm(key);
	};

	return (
		<section className='px-4 py-12 sm:px-6 lg:px-8'>
			<div className='mx-auto max-w-4xl'>
				<div className='mb-2'>
					<h2 className='text-2xl font-bold tracking-tight text-gray-900'>Browse Mock Data</h2>
					<p className='mt-1 text-sm text-gray-500'>
						Search or filter by category, then copy the JSON into your project.
					</p>
				</div>

				<ModelBrowser
					selectedKey={resolvedKey}
					onSelect={handleSelect}
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
				/>

				<div className='mt-8'>
					<JsonViewer data={data as object} title={displayTitle} />
				</div>

				{matches.length > 1 && searchTerm && (
					<div className='mt-6'>
						<p className='mb-3 text-sm font-medium text-gray-500'>
							{matches.length} matching datasets
						</p>
						<div className='space-y-6'>
							{matches
								.filter((m) => m.key !== resolvedKey)
								.slice(0, 3)
								.map((match) => (
									<JsonViewer
										key={match.key}
										data={getMockDataByKey(match.key) as object}
										title={`${match.title} (${match.key})`}
									/>
								))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

export default SearchPanel;

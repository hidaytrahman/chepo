import { useMemo } from 'react';
import { getRegistryEntry } from '../../../model';
import { searchCatalog } from '../../../utils/search.utils';
import { useModelUrl } from '../../../hooks/useModelUrl';
import ModelBrowser from '../../utils/ModelBrowser';
import LazyJsonViewer from '../../utils/LazyJsonViewer';

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
			getRegistryEntry(selectedKey)
		) {
			return selectedKey;
		}
		const exact = matches.find((m) => m.key.toLowerCase() === searchTerm.toLowerCase());
		return exact?.key || matches[0]?.key || DEFAULT_KEY;
	}, [selectedKey, searchTerm, matches]);

	useModelUrl(resolvedKey);

	const entry = getRegistryEntry(resolvedKey);
	const displayTitle = entry ? `${entry.title} (${entry.key})` : resolvedKey;
	const shareUrl = useMemo(() => {
		if (typeof window === 'undefined') return '';
		return `${window.location.origin}${window.location.pathname}?model=${resolvedKey}`;
	}, [resolvedKey]);

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

				<div className='mt-3 flex items-center gap-2 text-xs text-gray-400'>
					<span>Shareable link:</span>
					<a
						href={`?model=${resolvedKey}`}
						className='truncate font-mono text-indigo-600 hover:text-indigo-800'
						title={shareUrl}
					>
						?model={resolvedKey}
					</a>
				</div>

				<div className='mt-8'>
					<LazyJsonViewer datasetKey={resolvedKey} title={displayTitle} />
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
									<LazyJsonViewer
										key={match.key}
										datasetKey={match.key}
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

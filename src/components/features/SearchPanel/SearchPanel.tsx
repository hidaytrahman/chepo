import { useMemo } from 'react';
import { Link, MagnifyingGlass } from 'phosphor-react';
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
		<section id='browse' className='scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8'>
			<div className='mx-auto max-w-5xl'>
				<div className='mb-8 text-center sm:text-left'>
					<div className='mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700'>
						<MagnifyingGlass size={14} weight='bold' />
						Dataset browser
					</div>
					<h2 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
						Find your mock data
					</h2>
					<p className='mt-3 max-w-2xl text-slate-600'>
						Search by name or tag, filter by category, then copy JSON or switch to{' '}
						<strong className='font-semibold text-slate-800'>Schema</strong> for TypeScript, Zod,
						PostgreSQL, and more.
					</p>
				</div>

				<div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
					<ModelBrowser
						selectedKey={resolvedKey}
						onSelect={handleSelect}
						searchTerm={searchTerm}
						onSearchChange={setSearchTerm}
					/>
				</div>

				<div className='mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-3 text-sm'>
					<Link size={16} className='shrink-0 text-indigo-500' weight='duotone' />
					<span className='text-slate-500'>Share this dataset:</span>
					<a
						href={`?model=${resolvedKey}`}
						className='truncate font-mono text-indigo-600 hover:text-indigo-800'
						title={shareUrl}
					>
						?model={resolvedKey}
					</a>
				</div>

				<div className='mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'>
					<LazyJsonViewer datasetKey={resolvedKey} title={displayTitle} />
				</div>

				{matches.length > 1 && searchTerm && (
					<div className='mt-8'>
						<p className='mb-4 text-sm font-medium text-slate-500'>
							{matches.length} matching datasets
						</p>
						<div className='space-y-6'>
							{matches
								.filter((m) => m.key !== resolvedKey)
								.slice(0, 3)
								.map((match) => (
									<div
										key={match.key}
										className='overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'
									>
										<LazyJsonViewer
											datasetKey={match.key}
											title={`${match.title} (${match.key})`}
										/>
									</div>
								))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

export default SearchPanel;

import { useMemo, useState } from 'react';
import { MagnifyingGlass, X } from 'phosphor-react';
import { searchCatalog, getCategories } from '../../utils/search.utils';
import { CATEGORY_LABELS, type MockCategory } from '../../model/types';

type ModelBrowserProps = {
	selectedKey: string;
	onSelect: (key: string) => void;
	searchTerm: string;
	onSearchChange: (value: string) => void;
};

const categoryColors: Record<MockCategory, string> = {
	user: 'bg-violet-100 text-violet-700 ring-violet-200',
	media: 'bg-sky-100 text-sky-700 ring-sky-200',
	commerce: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
	locale: 'bg-amber-100 text-amber-700 ring-amber-200',
	finance: 'bg-teal-100 text-teal-700 ring-teal-200',
	marketing: 'bg-rose-100 text-rose-700 ring-rose-200',
	ui: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
};

function ModelBrowser({ selectedKey, onSelect, searchTerm, onSearchChange }: ModelBrowserProps) {
	const [activeCategory, setActiveCategory] = useState<MockCategory | 'all'>('all');
	const categories = getCategories();

	const filteredItems = useMemo(() => {
		const items = searchCatalog(searchTerm);
		if (activeCategory === 'all') return items;
		return items.filter((item) => item.category === activeCategory);
	}, [searchTerm, activeCategory]);

	return (
		<div className='bg-white'>
			<div className='border-b border-slate-100 p-4 sm:p-5'>
				<div className='relative'>
					<MagnifyingGlass
						className='pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400'
						aria-hidden='true'
					/>
					<input
						type='search'
						value={searchTerm}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder='Search by name, category, or tag…'
						className='block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm'
						aria-label='Search mock datasets'
					/>
					{searchTerm && (
						<button
							type='button'
							onClick={() => onSearchChange('')}
							className='absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-600'
							aria-label='Clear search'
						>
							<X className='h-4 w-4' />
						</button>
					)}
				</div>

				<div className='mt-3 flex flex-wrap gap-2'>
					<button
						type='button'
						onClick={() => setActiveCategory('all')}
						className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition-colors ${
							activeCategory === 'all'
								? 'bg-indigo-600 text-white ring-indigo-600'
								: 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'
						}`}
					>
						All ({categories.reduce((sum, c) => sum + c.count, 0)})
					</button>
					{categories.map((cat) => (
						<button
							key={cat.id}
							type='button'
							onClick={() => setActiveCategory(cat.id)}
							className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition-colors ${
								activeCategory === cat.id
									? 'bg-indigo-600 text-white ring-indigo-600'
									: 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'
							}`}
						>
							{cat.label} ({cat.count})
						</button>
					))}
				</div>
			</div>

			<div className='max-h-80 overflow-y-auto p-2' role='listbox' aria-label='Mock datasets'>
				{filteredItems.length === 0 ? (
					<p className='px-3 py-8 text-center text-sm text-gray-500'>
						No datasets match &ldquo;{searchTerm}&rdquo;. Try a different keyword or category.
					</p>
				) : (
					<ul className='space-y-1'>
						{filteredItems.map((item) => {
							const isSelected = item.key === selectedKey;
							return (
								<li key={item.key}>
									<button
										type='button'
										role='option'
										aria-selected={isSelected}
										onClick={() => onSelect(item.key)}
										className={`w-full rounded-xl px-3 py-3 text-left transition-colors ${
											isSelected
												? 'bg-indigo-50 ring-1 ring-indigo-200'
												: 'hover:bg-slate-50'
										}`}
									>
										<div className='flex items-start justify-between gap-2'>
											<div className='min-w-0 flex-1'>
												<div className='flex items-center gap-2'>
													<span className='font-medium text-gray-900'>{item.title}</span>
													{item.isNew && (
														<span className='rounded bg-indigo-600 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white'>
															New
														</span>
													)}
												</div>
												<p className='mt-0.5 truncate text-sm text-gray-500'>{item.description}</p>
												<div className='mt-2 flex flex-wrap items-center gap-1.5'>
													<span
														className={`rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${categoryColors[item.category]}`}
													>
														{CATEGORY_LABELS[item.category]}
													</span>
													{item.source.type === 'json' && (
														<span className='rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-700 ring-1 ring-orange-200'>
															JSON
														</span>
													)}
													<span className='font-mono text-[10px] text-gray-400'>{item.key}</span>
												</div>
											</div>
										</div>
									</button>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
}

export default ModelBrowser;

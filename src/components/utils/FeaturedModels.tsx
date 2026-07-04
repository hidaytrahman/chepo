import { getFeaturedDatasets } from '../../utils/search.utils';

type FeaturedModelsProps = {
	onSelect: (key: string) => void;
};

function FeaturedModels({ onSelect }: FeaturedModelsProps) {
	const featured = getFeaturedDatasets();

	return (
		<div className='flex flex-wrap justify-center gap-2'>
			{featured.map((item) => (
				<button
					key={item.key}
					type='button'
					onClick={() => onSelect(item.key)}
					className='rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md'
				>
					{item.title}
				</button>
			))}
		</div>
	);
}

export default FeaturedModels;

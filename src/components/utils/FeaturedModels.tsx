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
					className='rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-indigo-50 hover:text-indigo-700 hover:ring-indigo-200'
				>
					{item.title}
				</button>
			))}
		</div>
	);
}

export default FeaturedModels;

import { dataList, highlightColors } from '../../utils/search.utils';

function DataEntity({ setColor }: any) {
	return (
		<div className='flex flex-wrap gap-2'>
			{dataList.map((data, index) => (
				<span
					onClick={() => setColor(data.name)}
					key={data.name}
					className={`cursor-pointer
							 bg-gray-100 text-gray-800  dark:bg-gray-700 dark:text-gray-300
							bg-${highlightColors[index]}-100 text-${highlightColors[index]}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-${highlightColors[index]}-700 dark:text-${highlightColors[index]}-300`}
				>
					{data.name}
				</span>
			))}
		</div>
	);
}

export default DataEntity;

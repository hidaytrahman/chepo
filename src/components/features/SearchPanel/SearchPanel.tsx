import { modal } from '../../../model';
import { dataList } from '../../../utils/search.utils';
import DataEntity from '../../utils/DataEntity';
import JsonViewer from '../../utils/jsonViewer/JsonViewer';

function SearchPanel({ searchTerm, setSearchTerm }: any) {
	return (
		<section
			style={{
				padding: '4rem',
				maxWidth: 1024,
				margin: '0 auto',
			}}
		>
			<div>
				<label htmlFor='search' className='title-big'>
					Search Data
				</label>
				<input
					className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					type='text'
					placeholder='e.g user, months, products'
					list='mockdata'
					id='search'
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
				/>

				<div className='my-4'>
					<span className='my-2 inline-block'>or choose from:</span>
					<br />
					<DataEntity setColor={setSearchTerm} />
				</div>

				<hr />

				<datalist id='mockdata'>
					{dataList.map((data) => (
						<option key={data.id} value={data.name} />
					))}
				</datalist>
			</div>

			{modal[searchTerm] ? (
				<JsonViewer data={modal[searchTerm]} title={searchTerm} />
			) : (
				<JsonViewer data={modal.videoPlayer} title='Example: videoPlayer' />
			)}

			<hr />

			{/* Render dynamically */}

			{/* <JsonViewer data={users} title="User" /> */}
			{/* <JsonViewer data={githubUser} title='Github user' /> */}
			{/* <JsonViewer data={photosShort} title="Photos Short" /> */}
			{/* <JsonViewer data={photosFull} title="Photos Full" /> */}
		</section>
	);
}

export default SearchPanel;

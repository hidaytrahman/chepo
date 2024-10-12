import { isJSONArray, isJSONObject, isPlainObject } from 'es-toolkit';
import SampleObject from './SampleObject';

function DataSample({ data }: { data: any }) {
	return (
		<div>
			{/* Object handling */}
			<h2>Object Handling</h2>
			{isJSONObject(data) ? <SampleObject object={data} /> : 'no'}

			{/* Array handling */}
			<h2>Array Handling</h2>
			{isJSONArray(data) ? 'array' : 'no'}
		</div>
	);
}

export default DataSample;

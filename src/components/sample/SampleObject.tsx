import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';

function SampleObject({ object }: { object: any }) {
	return (
		<div>
			{Object.entries(object).map((key, value) => {
				return `${key}: ${value}`;
			})}

			{/* <ReactTabulator
				// columns={columns}
				data={object}
				options={{}}
				// events={{ rowClick: rowClickHandler }}
			/> */}
		</div>
	);
}

export default SampleObject;

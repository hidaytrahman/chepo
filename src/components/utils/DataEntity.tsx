import { Badge, Typography } from '@mui/material';
import { getDataCatalog } from '../../utils/search.utils';
import { getRandomColor } from '../../utils';

function DataEntity({ setColor, applyColor }: { setColor: (name: string) => void; applyColor?: boolean }) {
	return (
		<div className='flex flex-wrap gap-2'>
			{getDataCatalog().map((data) => (
				<Badge color='primary' badgeContent={data.isNew ? 'New' : 0} key={data.id}>
					<Typography
						component={'span'}
						onClick={() => setColor(data.name)}
						key={data.name}
						p={0.5}
						px={1}
						borderRadius={1}
						textTransform={'capitalize'}
						fontSize={'small'}
						style={{
							cursor: 'pointer',
							backgroundColor: applyColor ? getRandomColor() : 'rgb(240 240 240)',
						}}
					>
						{data.name}
					</Typography>
				</Badge>
			))}
		</div>
	);
}

export default DataEntity;

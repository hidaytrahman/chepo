import { CopyButton } from '../copy/Copy';
import './JsonViewer.css';
type JsonViewerPropsType = {
	data: [] | {};
	title: string;
};

const JsonViewer = ({ data, title }: JsonViewerPropsType) => {
	return (
		<section className='json-view-wrapper'>
			<h3 className='title text-gray-600'>{title}</h3>
			<span className='short-text mt-2'>Copy and paste in your fav editor.</span>

			<br />
			<article className='json-view mt-3'>
				<header className='json-view__header'>
					<CopyButton content={data} />
				</header>
				<pre>{JSON.stringify(data, undefined, 4)}</pre>
			</article>
		</section>
	);
};

export default JsonViewer;

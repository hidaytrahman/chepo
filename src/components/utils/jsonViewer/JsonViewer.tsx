import { CopyButton } from '../copy/Copy';
import './JsonViewer.css';
import Highlight from 'react-highlight';

// list of theme can be imported here if needed
// import 'highlight.js/styles/default.css';
// import 'highlight.js/styles/kimbie.dark.css';
// import 'highlight.js/styles/a11y-dark.css';
// import 'highlight.js/styles/an-old-hope.css';
// import 'highlight.js/styles/atom-one-dark-reasonable.css';
// import 'highlight.js/styles/vs2015.css';
import 'highlight.js/styles/agate.css';

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

				{/* @ts-ignore */}
				<Highlight language='json'>{JSON.stringify(data, undefined, 4)}</Highlight>
				{/* <pre>
					<code className='language-json'>{JSON.stringify(data, undefined, 4)} </code>
				</pre> */}
			</article>
		</section>
	);
};

export default JsonViewer;

import { Copy } from 'phosphor-react';

export const CopyButton = ({
	content,
	onClick = () => {},
	onError,
}: {
	content: any;
	onClick?: () => void;
	onError?: (err: Error) => void;
}) => {
	const copy = () => {
		navigator.clipboard
			.writeText(JSON.stringify(content))
			.then(onClick)
			.catch((e) => {
				if (onError) {
					onError(e);
				} else {
					console.log(e);
				}
			});
	};
	return (
		<button onClick={copy}>
			<Copy size={30} color='grey' />
		</button>
	);
};

import { Copy } from 'phosphor-react';

/**
 * A button component that copies the provided content to the clipboard when clicked.
 *
 * @param content - The content to be copied to the clipboard. It will be stringified using `JSON.stringify`.
 * @param onClick - Optional callback invoked after a successful copy operation.
 * @param onError - Optional callback invoked if the copy operation fails, receiving the error as an argument.
 *
 * @example
 * <CopyButton content={{ foo: 'bar' }} onClick={() => alert('Copied!')} />
 */
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

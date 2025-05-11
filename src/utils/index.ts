/**
 * Appends a new `<pre>` element to the document body and sets its inner HTML to the provided input.
 *
 * @param inp - The content to display inside the newly created `<pre>` element. Can be of any type.
 */
export function output(inp: any) {
	document.body.appendChild(document.createElement('pre')).innerHTML = inp;
}

// This function is used to highlight JSON syntax in a string. It replaces special characters with HTML entities and then applies syntax highlighting to the JSON string.
// It uses regular expressions to match different JSON elements (strings, keys, booleans, null, and numbers) and wraps them in span tags with appropriate classes for styling.
// The function returns the highlighted JSON string, which can be used for display purposes in a web application.
// The function is useful for rendering JSON data in a more readable format, especially in web applications where you want to display JSON data with syntax highlighting.
// It can be used in various scenarios, such as displaying API responses, configuration files, or any other JSON data in a user-friendly format.
// The function is designed to be used in a web environment, as it manipulates the DOM by appending the highlighted JSON string to the document body.
// It is important to note that this function does not modify the original JSON data; it only formats it for display purposes.
// The function uses a regular expression to match different JSON elements and applies syntax highlighting by wrapping them in span tags with appropriate classes.
export function syntaxHighlight(json: any) {
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	const stringOrKeyRegex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)/g;
	const booleanOrNullRegex = /\b(true|false|null)\b/g;
	const numberRegex = /-?\d+(\.\d*)?([eE][+\-]?\d+)?/g;

	return json
		.replace(stringOrKeyRegex, function (match: any) {
			let cls = /:$/.test(match) ? 'key' : 'string';
			return '<span class="' + cls + '">' + match + '</span>';
		})
		.replace(booleanOrNullRegex, function (match: any) {
			let cls = match === 'null' ? 'null' : 'boolean';
			return '<span class="' + cls + '">' + match + '</span>';
		})
		.replace(numberRegex, function (match: any) {
			return '<span class="number">' + match + '</span>';
		});
}

export const obj = {
	a: 1,
	b: 'foo',
	c: [false, 'false', null, 'null', { d: { e: 1.3e5, f: '1.3e5' } }],
};

/**
 * Generates a random hexadecimal color code.
 *
 * @returns {string} A string representing a random color in hexadecimal format (e.g., "#a3e12f").
 */
export const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

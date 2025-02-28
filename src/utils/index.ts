export function output(inp: any) {
	document.body.appendChild(document.createElement('pre')).innerHTML = inp;
}

export function syntaxHighlight(json: any) {
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
		function (match: any) {
			var cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		}
	);
}

export var obj = {
	a: 1,
	b: 'foo',
	c: [false, 'false', null, 'null', { d: { e: 1.3e5, f: '1.3e5' } }],
};
var str = JSON.stringify(obj, undefined, 4);

export const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
// output(str);
// output(syntaxHighlight(str));

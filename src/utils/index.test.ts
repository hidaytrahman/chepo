import { getRandomColor, syntaxHighlight } from './index';

// Test suite for the syntaxHighlight function

describe('syntaxHighlight', () => {
	it('should highlight JSON strings', () => {
		const input = '{"key": "value"}';
		const result = syntaxHighlight(input);
		expect(result).toContain('<span class="key">"key":</span>');
		expect(result).toContain('<span class="string">"value"</span>');
	});

	it('should highlight string values', () => {
		const input = '"foo"';
		const result = syntaxHighlight(input);
		expect(result).toContain('<span class="string">"foo"</span>');
	});

	it('should highlight keys', () => {
		const input = '"key":';
		const result = syntaxHighlight(input);
		expect(result).toContain('<span class="key">"key":</span>');
	});

	it('should highlight numbers', () => {
		const input = '123';
		const result = syntaxHighlight(input);
		expect(result).toContain('<span class="number">123</span>');
	});

	it('should highlight booleans', () => {
		const input = 'true';
		const result = syntaxHighlight(input);
		expect(result).toContain('<span class="boolean">true</span>');
	});

	it('should highlight null', () => {
		const input = 'null';
		const result = syntaxHighlight(input);
		expect(result).toContain('<span class="null">null</span>');
	});

	it('should escape HTML special characters', () => {
		const input = '"<tag>&"';
		const result = syntaxHighlight(input);
		expect(result).toContain('&lt;tag&gt;');
		expect(result).toContain('&amp;');
	});

	it('should highlight a full JSON string', () => {
		const input = JSON.stringify({ a: 1, b: 'foo', c: true, d: null }, null, 2);
		const result = syntaxHighlight(input);
		expect(result).toContain('<span class="key">"a":</span>');
		expect(result).toContain('<span class="number">1</span>');
		expect(result).toContain('<span class="key">"b":</span>');
		expect(result).toContain('<span class="string">"foo"</span>');
		expect(result).toContain('<span class="key">"c":</span>');
		expect(result).toContain('<span class="boolean">true</span>');
		expect(result).toContain('<span class="key">"d":</span>');
		expect(result).toContain('<span class="null">null</span>');
	});

	it('should highlight negative numbers and floats', () => {
		const input = '-42.5';
		const result = syntaxHighlight(input);
		expect(result).toContain('<span class="number">-42.5</span>');
	});

	it('should highlight scientific notation numbers', () => {
		const input = '1.23e4';
		const result = syntaxHighlight(input);
		expect(result).toContain('<span class="number">1.23e4</span>');
	});

	it('should not highlight non-JSON text', () => {
		const input = 'plain text';
		const result = syntaxHighlight(input);
		expect(result).toBe('plain text');
	});

	it('should handle empty string', () => {
		const input = '';
		const result = syntaxHighlight(input);
		expect(result).toBe('');
	});

	it('should highlight escaped quotes in strings', () => {
		const input = '"foo\\"bar"';
		const result = syntaxHighlight(input);
		expect(result).toContain('<span class="string">"foo\\"bar"</span>');
	});

	it('should not double-escape already escaped HTML entities', () => {
		const input = '"&amp;"';
		const result = syntaxHighlight(input);
		expect(result).toContain('&amp;');
	});

	it('should highlight multiple types in a complex JSON string', () => {
		const input = JSON.stringify(
			{
				num: 42,
				str: 'hello',
				bool: false,
				nul: null,
				arr: [1, 'two', true, null],
			},
			null,
			2
		);
		const result = syntaxHighlight(input);
		expect(result).toContain('<span class="key">"num":</span>');
		expect(result).toContain('<span class="number">42</span>');
		expect(result).toContain('<span class="key">"str":</span>');
		expect(result).toContain('<span class="string">"hello"</span>');
		expect(result).toContain('<span class="key">"bool":</span>');
		expect(result).toContain('<span class="boolean">false</span>');
		expect(result).toContain('<span class="key">"nul":</span>');
		expect(result).toContain('<span class="null">null</span>');
		expect(result).toContain('<span class="string">"two"</span>');
		expect(result).toContain('<span class="boolean">true</span>');
	});
});

describe('getRandomColor', () => {
	it('should return a string', () => {
		const color = getRandomColor();
		expect(typeof color).toBe('string');
	});
	it('should return a color in the format #RRGGBB', () => {
		const color = getRandomColor();
		expect(color).toMatch(/^#[0-9A-F]{6}$/i);
	});
	it('should return a different color each time', () => {
		const color1 = getRandomColor();
		const color2 = getRandomColor();
		expect(color1).not.toBe(color2);
	});
	it('should return a color with a valid hex code', () => {
		const color = getRandomColor();
		const r = parseInt(color.slice(1, 3), 16);
	});
});

describe('output', () => {
	let appendChildSpy: jest.SpyInstance;
	let createElementSpy: jest.SpyInstance;
	let preElement: HTMLElement;

	beforeEach(() => {
		preElement = document.createElement('pre');
		createElementSpy = jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
			if (tagName === 'pre') return preElement;
			return document.createElement(tagName);
		});
		appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation((el: Node) => el);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should append a pre element to the document body', () => {
		const input = 'Hello, World!';
		require('./index').output(input);
		expect(createElementSpy).toHaveBeenCalledWith('pre');
		expect(appendChildSpy).toHaveBeenCalledWith(preElement);
	});

	it('should set the innerHTML of the pre element to the input', () => {
		const input = '<b>bold</b>';
		require('./index').output(input);
		expect(preElement.innerHTML).toBe(input);
	});
});

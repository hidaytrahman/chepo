import { syntaxHighlight } from './index';

describe('syntaxHighlight', () => {
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
});

// We recommend installing an extension to run jest tests.

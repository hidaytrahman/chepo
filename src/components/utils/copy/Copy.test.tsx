import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CopyButton } from './Copy';

// Mock the Clipboard API
beforeAll(() => {
	Object.defineProperty(window.navigator, 'clipboard', {
		value: {
			writeText: jest.fn(),
		},
		writable: true,
	});
});

beforeEach(() => {
	// Reset all mocks before each test to avoid leakage
	jest.clearAllMocks();
});

describe('CopyButton', () => {
	test('should call onClick when copy is successful', async () => {
		const onClickMock = jest.fn();
		const content = { message: 'test' };

		// Mock clipboard to resolve the promise
		(navigator.clipboard.writeText as jest.Mock).mockResolvedValueOnce(undefined);

		render(<CopyButton content={content} onClick={onClickMock} />);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		// Wait for the promise inside the copy function to resolve
		await waitFor(() => {
			// Assert that the onClick function was called
			expect(onClickMock).toHaveBeenCalledTimes(1);
		});
	});

	test('should call onError when copy fails', async () => {
		const onErrorMock = jest.fn();
		const content = { message: 'test' };

		// Mock clipboard to reject the promise
		(navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(new Error('Clipboard error'));

		render(<CopyButton content={content} onError={onErrorMock} />);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		// Wait for the promise inside the copy function to resolve
		await waitFor(() => {
			// Assert that onError was called with the error
			expect(onErrorMock).toHaveBeenCalledWith(new Error('Clipboard error'));
			expect(onErrorMock).toHaveBeenCalledTimes(1);
		});
	});

	test('should log error if onError is not provided', async () => {
		const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
		const content = { message: 'test' };

		// Mock clipboard to reject the promise
		(navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(new Error('Clipboard error'));

		render(<CopyButton content={content} />);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		// Wait for the promise inside the copy function to resolve
		await waitFor(() => {
			// Assert that console.log is called with the error
			expect(consoleLogSpy).toHaveBeenCalledWith(new Error('Clipboard error'));
		});

		// Clean up spy
		consoleLogSpy.mockRestore();
	});

	test('should call navigator.clipboard.writeText with correct content', async () => {
		const content = { message: 'test' };

		// Mock clipboard to resolve the promise
		(navigator.clipboard.writeText as jest.Mock).mockResolvedValueOnce(undefined);

		render(<CopyButton content={content} />);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		// Wait for the promise inside the copy function to resolve
		await waitFor(() => {
			// Assert that the clipboard API was called with the correct stringified content
			expect(navigator.clipboard.writeText).toHaveBeenCalledWith(JSON.stringify(content));
			expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
		});
	});
});

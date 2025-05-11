// write unit tests for Landing.tsx
import { render, screen } from '@testing-library/react';
import Landing from './Landing';

describe('Landing', () => {
	it('should render the landing page with logo and navigation', () => {
		render(<Landing />);
	});
});

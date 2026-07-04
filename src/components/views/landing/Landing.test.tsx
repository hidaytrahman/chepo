import { render, screen } from '@testing-library/react';
import Landing from './Landing';

describe('Landing', () => {
	it('renders hero and browse sections with updated content', () => {
		render(<Landing />);

		expect(screen.getByText(/mock data and/i)).toBeInTheDocument();
		expect(screen.getByText(/schemas/i)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /browse datasets/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /find your mock data/i })).toBeInTheDocument();
		expect(screen.getByText(/schema export formats/i)).toBeInTheDocument();
	});
});

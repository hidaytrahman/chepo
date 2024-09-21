export const cart = {
	cart_id: '123456789',
	user_id: '987654321',
	items: [
		{
			item_id: '1001',
			name: 'Wireless Headphones',
			quantity: 2,
			price_per_unit: 50.99,
			total_price: 101.98,
			currency: 'USD',
			category: 'Electronics',
			description: 'Noise-cancelling over-ear wireless headphones',
			image_url: 'https://example.com/images/headphones.jpg',
		},
		{
			item_id: '1002',
			name: 'Smartphone Case',
			quantity: 1,
			price_per_unit: 15.99,
			total_price: 15.99,
			currency: 'USD',
			category: 'Accessories',
			description: 'Durable silicone case for smartphone',
			image_url: 'https://example.com/images/case.jpg',
		},
	],
	total_items: 3,
	subtotal: 117.97,
	tax: 7.08,
	shipping_cost: 5.0,
	total_cost: 130.05,
	currency: 'USD',
	shipping_address: {
		name: 'John Doe',
		address_line_1: '123 Main St',
		address_line_2: 'Apt 4B',
		city: 'New York',
		state: 'NY',
		postal_code: '10001',
		country: 'USA',
	},
	payment_method: {
		method: 'Credit Card',
		card_last_four_digits: '1234',
		billing_address: {
			name: 'John Doe',
			address_line_1: '123 Main St',
			address_line_2: 'Apt 4B',
			city: 'New York',
			state: 'NY',
			postal_code: '10001',
			country: 'USA',
		},
	},
	order_notes: 'Leave package at the door if not home.',
};
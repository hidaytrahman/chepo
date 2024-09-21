import { User } from './types';

export const githubUser = {
	login: 'hidaytrahman',
	id: 9712111,
	avatar_url: 'https://avatars.githubusercontent.com/u/9712111?v=4',
	gravatar_id: '',
	url: 'https://api.github.com/users/hidaytrahman',
	html_url: 'https://github.com/hidaytrahman',
	followers_url: 'https://api.github.com/users/hidaytrahman/followers',
	following_url: 'https://api.github.com/users/hidaytrahman/following{/other_user}',
	received_events_url: 'https://api.github.com/users/hidaytrahman/received_events',
	type: 'User',
	site_admin: false,
	name: 'Hidayt Rahman',
	company: '@qatalog',
	blog: 'https://hidaytrahman.github.io',
	location: 'New Delhi , IND',
	email: null,
	hireable: true,
	bio: "I'm a JavaScript developer who enjoys creating products to improve the productivity and usability of tech in overall capacity.",
	twitter_username: 'hidaytrahman',
	public_repos: 39,
	public_gists: 9,
	followers: 21,
	following: 19,
	created_at: '2014-11-13T05:25:43Z',
	updated_at: '2023-01-20T12:57:03Z',
};
export const users: User[] = [
	{
		user_id: '12345',
		first_name: 'John',
		last_name: 'Doe',
		email: 'john.doe@example.com',
		username: 'johndoe123',
		password_hash: 'hashed_password_here',
		phone: '+1234567890',
		address: {
			street: '123 Main St',
			city: 'Anytown',
			state: 'CA',
			zip_code: '12345',
			country: 'USA',
		},
		dob: '1990-01-01',
		gender: 'male',
		preferences: {
			language: 'en',
			timezone: 'America/Los_Angeles',
			newsletter_subscribed: true,
		},
		account_status: 'active',
		registration_date: '2023-01-01T12:00:00Z',
		last_login: '2024-09-21T12:00:00Z',
		roles: ['user', 'admin'],
		security_questions: [
			{
				question: "What is your mother's maiden name?",
				answer_hash: 'hashed_answer_here',
			},
		],
		purchase_history: [
			{
				order_id: '98765',
				purchase_date: '2024-08-15T12:00:00Z',
				items: [
					{
						item_id: '56789',
						item_name: 'Wireless Mouse',
						quantity: 1,
						price: 25.99,
					},
				],
				total_price: 25.99,
			},
		],
	},
];

export const todos: any = [
	{
		id: '12',
		title: 'Lets have some coffee',
		isCompleted: false,
	},
];

export const userMe = {
	gender: 'male',
	name: {
		title: 'Mr',
		first: 'Oscar',
		last: 'Masson',
	},
	location: {
		street: {
			number: 2068,
			name: 'Rue Bataille',
		},
		city: 'Pau',
		state: 'Landes',
		country: 'France',
		postcode: 46548,
		coordinates: {
			latitude: '-13.6268',
			longitude: '-177.0115',
		},
		timezone: {
			offset: '-8:00',
			description: 'Pacific Time (US & Canada)',
		},
	},
	email: 'oscar.masson@example.com',
	login: {
		uuid: 'ca236a86-e123-4767-91b0-ecffce4e393d',
		username: 'sadbear905',
		password: 'angus1',
		salt: '7gjnCxD2',
		md5: 'e1d65f3b7713e93089a6368830faca68',
		sha1: '3a5a28d3946ea15179cec7dc42848ed452592fb1',
		sha256: '9e2e4ed336eb5f7bc8e33775984f2946514bbb1bcc70c6c8b2f364080d9bb1f4',
	},
	dob: {
		date: '1990-02-06T09:27:35.580Z',
		age: 33,
	},
	registered: {
		date: '2021-04-30T04:33:05.671Z',
		age: 1,
	},
	phone: '04-92-92-52-82',
	cell: '06-22-53-09-92',
	id: {
		name: 'INSEE',
		value: '1900139025812 22',
	},
	picture: {
		large: 'https://randomuser.me/api/portraits/men/94.jpg',
		medium: 'https://randomuser.me/api/portraits/med/men/94.jpg',
		thumbnail: 'https://randomuser.me/api/portraits/thumb/men/94.jpg',
	},
	nat: 'FR',
};

export const photosFull = {
	id: 'Dwu85P9SOIk',
	created_at: '2016-05-03T11:00:28-04:00',
	updated_at: '2016-07-10T11:00:01-05:00',
	width: 2448,
	height: 3264,
	color: '#6E633A',
	blur_hash: 'LFC$yHwc8^$yIAS$%M%00KxukYIp',
	downloads: 1345,
	likes: 24,
	liked_by_user: false,
	public_domain: false,
	description: 'A man drinking a coffee.',
	exif: {
		make: 'Canon',
		model: 'Canon EOS 40D',
		name: 'Canon, EOS 40D',
		exposure_time: '0.011111111111111112',
		aperture: '4.970854',
		focal_length: '37',
		iso: 100,
	},
	location: {
		city: 'Montreal',
		country: 'Canada',
		position: {
			latitude: 45.473298,
			longitude: -73.638488,
		},
	},
	tags: [
		{
			title: 'man',
		},
		{
			title: 'drinking',
		},
		{
			title: 'coffee',
		},
	],
	current_user_collections: [
		{
			id: 206,
			title: 'Makers: Cat and Ben',
			published_at: '2016-01-12T18:16:09-05:00',
			last_collected_at: '2016-06-02T13:10:03-04:00',
			updated_at: '2016-07-10T11:00:01-05:00',
			cover_photo: null,
			user: null,
		},
	],
	urls: {
		raw: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
		full: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg',
		regular: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max',
		small: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max',
		thumb: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max',
	},
	links: {
		self: 'https://api.unsplash.com/photos/Dwu85P9SOIk',
		html: 'https://unsplash.com/photos/Dwu85P9SOIk',
		download: 'https://unsplash.com/photos/Dwu85P9SOIk/download',
	},
	user: {
		id: 'QPxL2MGqfrw',
		updated_at: '2016-07-10T11:00:01-05:00',
		username: 'exampleuser',
		name: 'Joe Example',
		portfolio_url: 'https://example.com/',
		bio: 'Just an everyday Joe',
		location: 'Montreal',
		total_likes: 5,
		total_photos: 10,
		total_collections: 13,
		links: {
			self: 'https://api.unsplash.com/users/exampleuser',
			html: 'https://unsplash.com/exampleuser',
			photos: 'https://api.unsplash.com/users/exampleuser/photos',
			likes: 'https://api.unsplash.com/users/exampleuser/likes',
			portfolio: 'https://api.unsplash.com/users/exampleuser/portfolio',
		},
	},
};

export const photosShort = {
	id: 'Dwu85P9SOIk',
	created_at: '2016-05-03T11:00:28-04:00',
	updated_at: '2016-07-10T11:00:01-05:00',
	downloads: 1345,
	likes: 24,
	description: 'A man drinking a coffee.',
	exif: {
		make: 'Canon',
		name: 'Canon, EOS 40D',
		aperture: '4.970854',
		focal_length: '37',
	},
	location: {
		city: 'Montreal',
		country: 'Canada',
	},
	tags: [
		{
			title: 'man',
		},
		{
			title: 'drinking',
		},
		{
			title: 'coffee',
		},
	],
	urls: {
		thumb: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max',
	},
	user: {
		id: 'QPxL2MGqfrw',
		username: 'exampleuser',
		name: 'Joe Example',
	},
};

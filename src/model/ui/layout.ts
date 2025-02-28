export const layout = {
	status: 'success',
	message: 'Layout data retrieved successfully',
	data: {
		layoutId: '12345',
		layoutName: 'Main Dashboard Layout',
		description: 'This is the primary layout used for the main dashboard.',
		sections: [
			{
				sectionId: 'header',
				sectionName: 'Header',
				components: [
					{
						componentId: 'logo',
						componentType: 'image',
						properties: {
							src: 'https://example.com/logo.png',
							alt: 'Company Logo',
							width: '150px',
							height: '50px',
						},
					},
					{
						componentId: 'navigation',
						componentType: 'menu',
						properties: {
							items: [
								{ label: 'Home', link: '/home' },
								{ label: 'About', link: '/about' },
								{ label: 'Contact', link: '/contact' },
							],
						},
					},
				],
			},
			{
				sectionId: 'sidebar',
				sectionName: 'Sidebar',
				components: [
					{
						componentId: 'userProfile',
						componentType: 'profile',
						properties: {
							username: 'john_doe',
							avatar: 'https://example.com/avatar/john_doe.png',
							links: [
								{ label: 'Profile', link: '/profile' },
								{ label: 'Settings', link: '/settings' },
							],
						},
					},
				],
			},
			{
				sectionId: 'content',
				sectionName: 'Main Content',
				components: [
					{
						componentId: 'welcomeMessage',
						componentType: 'text',
						properties: {
							text: 'Welcome to the Dashboard!',
							fontSize: '24px',
							color: '#333333',
						},
					},
					{
						componentId: 'recentActivity',
						componentType: 'list',
						properties: {
							items: [
								{ text: 'Logged in', timestamp: '2023-10-01T08:00:00Z' },
								{ text: 'Updated profile', timestamp: '2023-10-01T09:00:00Z' },
							],
						},
					},
				],
			},
			{
				sectionId: 'footer',
				sectionName: 'Footer',
				components: [
					{
						componentId: 'copyright',
						componentType: 'text',
						properties: {
							text: '© 2023 Company Name. All rights reserved.',
							fontSize: '12px',
							color: '#666666',
						},
					},
				],
			},
		],
	},
};

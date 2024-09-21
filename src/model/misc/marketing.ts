export const marketing = {
	marketing_data: {
		campaigns: [
			{
				campaign_id: 'c001',
				campaign_name: 'Summer Sale 2024',
				start_date: '2024-06-01',
				end_date: '2024-06-30',
				budget: 50000,
				channels: ['Email', 'Social Media', 'PPC'],
				target_audience: {
					demographics: {
						age_range: '18-35',
						gender: 'All',
						location: 'USA',
					},
					interests: ['Fashion', 'Technology', 'Travel'],
				},
				performance_metrics: {
					impressions: 250000,
					clicks: 15000,
					conversions: 1200,
					conversion_rate: 8.0,
					return_on_investment: 3.5,
				},
				status: 'Active',
			},
			{
				campaign_id: 'c002',
				campaign_name: 'Winter Holiday Promotion',
				start_date: '2024-11-15',
				end_date: '2024-12-31',
				budget: 75000,
				channels: ['Social Media', 'Email', 'Influencer Marketing'],
				target_audience: {
					demographics: {
						age_range: '25-45',
						gender: 'All',
						location: 'North America',
					},
					interests: ['Home Decor', 'Gifts', 'Food'],
				},
				performance_metrics: {
					impressions: 500000,
					clicks: 25000,
					conversions: 2000,
					conversion_rate: 8.0,
					return_on_investment: 4.2,
				},
				status: 'Planned',
			},
		],
		analytics: {
			overall_performance: {
				total_impressions: 750000,
				total_clicks: 40000,
				total_conversions: 3200,
				average_conversion_rate: 8.0,
				total_budget_spent: 125000,
				total_roi: 3.9,
			},
		},
		customer_feedback: [
			{
				campaign_id: 'c001',
				feedback_id: 'f001',
				customer_id: 'u123',
				rating: 4,
				comment: 'Great deals on summer apparel!',
				date: '2024-06-15',
			},
			{
				campaign_id: 'c002',
				feedback_id: 'f002',
				customer_id: 'u456',
				rating: 5,
				comment: 'Loved the holiday promotion! Will shop again.',
				date: '2024-12-20',
			},
		],
	},
};

// Address model
interface Address {
	street: string;
	city: string;
	state: string;
	zip_code: string;
	country: string;
}

// Preferences model
interface Preferences {
	language: string;
	timezone: string;
	newsletter_subscribed: boolean;
}

// Security Question model
interface SecurityQuestion {
	question: string;
	answer_hash: string;
}

// Item model for purchase history
interface Item {
	item_id: string;
	item_name: string;
	quantity: number;
	price: number;
}

// Purchase History model
interface PurchaseHistory {
	order_id: string;
	purchase_date: string; // ISO date string
	items: Item[];
	total_price: number;
}

// Main User model
export interface User {
	user_id: string;
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	password_hash: string;
	phone: string;
	address: Address;
	dob: string; // ISO date string (YYYY-MM-DD)
	gender: string; // Use union type for stricter control: 'male' | 'female' | 'other' | 'prefer_not_to_say'
	preferences: Preferences;
	account_status: string; // Use union type for stricter control: 'active' | 'inactive' | 'suspended'
	registration_date: string; // ISO date string
	last_login: string; // ISO date string
	roles: string[]; // List of roles (e.g., 'user', 'admin')
	security_questions: SecurityQuestion[];
	purchase_history: PurchaseHistory[];
}

// Overall Users model
export interface Users {
	users: User[];
}

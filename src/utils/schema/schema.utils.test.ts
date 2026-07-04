import { generateSchema } from './index';

const sampleTodo = {
	id: 1,
	title: 'Buy milk',
	isCompleted: false,
};

const sampleUser = {
	login: 'octocat',
	id: 1,
	site_admin: false,
	email: null,
};

describe('schema generators', () => {
	test('generates TypeScript interface for object data', () => {
		const result = generateSchema(sampleUser, 'typescript', 'githubUser');
		expect(result).toContain('export interface GithubUser');
		expect(result).toContain('login: string');
		expect(result).toContain('site_admin: boolean');
	});

	test('generates TypeScript array type for list data', () => {
		const result = generateSchema([sampleTodo], 'typescript', 'todos');
		expect(result).toContain('export interface Todo');
		expect(result).toContain('export type Todos = Todo[]');
	});

	test('generates Zod schema with import', () => {
		const result = generateSchema(sampleTodo, 'zod', 'todo');
		expect(result).toContain("import { z } from 'zod'");
		expect(result).toContain('export const TodoSchema = z.object');
		expect(result).toContain('title: z.string()');
	});

	test('generates PostgreSQL CREATE TABLE', () => {
		const result = generateSchema(sampleTodo, 'postgresql', 'todo');
		expect(result).toContain('CREATE TABLE todo');
		expect(result).toContain('title TEXT NOT NULL');
		expect(result).toContain('is_completed BOOLEAN');
	});

	test('generates JSON Schema document', () => {
		const result = generateSchema(sampleTodo, 'json-schema', 'todo');
		const parsed = JSON.parse(result);
		expect(parsed.$schema).toContain('json-schema.org');
		expect(parsed.properties.title.type).toBe('string');
	});

	test('generates Prisma model', () => {
		const result = generateSchema(sampleTodo, 'prisma', 'todo');
		expect(result).toContain('model Todo');
		expect(result).toContain('title String');
	});

	test('generates GraphQL type', () => {
		const result = generateSchema(sampleTodo, 'graphql', 'todo');
		expect(result).toContain('type Todo');
		expect(result).toContain('title: String!');
	});

	test('generates Mongoose schema', () => {
		const result = generateSchema(sampleTodo, 'mongoose', 'todo');
		expect(result).toContain("import { Schema } from 'mongoose'");
		expect(result).toContain('const TodoSchema = new Schema');
	});
});

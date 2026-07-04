export type PrimitiveKind = 'string' | 'number' | 'integer' | 'boolean' | 'null';

export type InferredType =
	| { kind: 'primitive'; type: PrimitiveKind }
	| { kind: 'array'; items: InferredType }
	| { kind: 'object'; properties: Record<string, PropertySchema> }
	| { kind: 'unknown' };

export type PropertySchema = {
	type: InferredType;
	required: boolean;
};

export type SchemaFormat =
	| 'typescript'
	| 'zod'
	| 'postgresql'
	| 'json-schema'
	| 'prisma'
	| 'graphql'
	| 'mongoose';

export type SchemaFormatMeta = {
	id: SchemaFormat;
	label: string;
	language: string;
	description: string;
};

export const SCHEMA_FORMATS: SchemaFormatMeta[] = [
	{
		id: 'typescript',
		label: 'TypeScript',
		language: 'typescript',
		description: 'Interfaces and type aliases',
	},
	{
		id: 'zod',
		label: 'Zod',
		language: 'typescript',
		description: 'Runtime validation schemas',
	},
	{
		id: 'postgresql',
		label: 'PostgreSQL',
		language: 'sql',
		description: 'CREATE TABLE DDL',
	},
	{
		id: 'json-schema',
		label: 'JSON Schema',
		language: 'json',
		description: 'Draft 2020-12 JSON Schema',
	},
	{
		id: 'prisma',
		label: 'Prisma',
		language: 'typescript',
		description: 'Prisma model definitions',
	},
	{
		id: 'graphql',
		label: 'GraphQL',
		language: 'graphql',
		description: 'GraphQL type definitions',
	},
	{
		id: 'mongoose',
		label: 'Mongoose',
		language: 'javascript',
		description: 'MongoDB Mongoose schemas',
	},
];

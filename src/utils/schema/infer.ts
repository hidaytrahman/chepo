import type { InferredType, PropertySchema } from './types';

const isObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const mergeInferred = (left: InferredType, right: InferredType): InferredType => {
	if (left.kind === 'unknown') return right;
	if (right.kind === 'unknown') return left;

	if (left.kind === 'primitive' && right.kind === 'primitive') {
		if (left.type === right.type) return left;
		if (left.type === 'null') return { ...right };
		if (right.type === 'null') return { ...left };
		if (
			(left.type === 'integer' && right.type === 'number') ||
			(left.type === 'number' && right.type === 'integer')
		) {
			return { kind: 'primitive', type: 'number' };
		}
		return { kind: 'unknown' };
	}

	if (left.kind === 'array' && right.kind === 'array') {
		return { kind: 'array', items: mergeInferred(left.items, right.items) };
	}

	if (left.kind === 'object' && right.kind === 'object') {
		const properties: Record<string, PropertySchema> = { ...left.properties };
		for (const [key, schema] of Object.entries(right.properties)) {
			if (properties[key]) {
				properties[key] = {
					type: mergeInferred(properties[key].type, schema.type),
					required: properties[key].required && schema.required,
				};
			} else {
				properties[key] = { ...schema, required: false };
			}
		}
		for (const key of Object.keys(left.properties)) {
			if (!right.properties[key] && properties[key]) {
				properties[key] = { ...properties[key], required: false };
			}
		}
		return { kind: 'object', properties };
	}

	return { kind: 'unknown' };
};

const inferValue = (value: unknown): InferredType => {
	if (value === null) return { kind: 'primitive', type: 'null' };
	if (Array.isArray(value)) {
		if (value.length === 0) return { kind: 'array', items: { kind: 'unknown' } };
		return {
			kind: 'array',
			items: value.map(inferValue).reduce(mergeInferred),
		};
	}
	if (typeof value === 'boolean') return { kind: 'primitive', type: 'boolean' };
	if (typeof value === 'number') {
		return Number.isInteger(value)
			? { kind: 'primitive', type: 'integer' }
			: { kind: 'primitive', type: 'number' };
	}
	if (typeof value === 'string') return { kind: 'primitive', type: 'string' };
	if (isObject(value)) {
		const properties: Record<string, PropertySchema> = {};
		for (const [key, child] of Object.entries(value)) {
			properties[key] = {
				type: inferValue(child),
				required: child !== null && child !== undefined,
			};
		}
		return { kind: 'object', properties };
	}
	return { kind: 'unknown' };
};

export const inferSchemaFromData = (data: unknown): InferredType => inferValue(data);

export const toPascalCase = (value: string): string =>
	value
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/[_-]+/g, ' ')
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
		.join('');

export const toSingularTypeName = (key: string): string => {
	const pascal = toPascalCase(key);
	if (pascal.endsWith('ies')) return `${pascal.slice(0, -3)}y`;
	if (pascal.endsWith('ses') || pascal.endsWith('xes') || pascal.endsWith('zes')) {
		return pascal.slice(0, -2);
	}
	if (pascal.endsWith('s') && !pascal.endsWith('ss') && pascal.length > 1) {
		return pascal.slice(0, -1);
	}
	return pascal;
};

export const toSnakeCase = (value: string): string =>
	value
		.replace(/([a-z])([A-Z])/g, '$1_$2')
		.replace(/[\s-]+/g, '_')
		.toLowerCase();

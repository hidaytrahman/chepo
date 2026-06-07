import { inferSchemaFromData, toPascalCase, toSingularTypeName, toSnakeCase } from './infer';
import type { InferredType, PropertySchema, SchemaFormat } from './types';

type ObjectDefinition = {
	name: string;
	schema: Extract<InferredType, { kind: 'object' }>;
};

type GenerationPlan = {
	rootName: string;
	rootType: InferredType;
	isArrayRoot: boolean;
	definitions: ObjectDefinition[];
};

const isNullable = (type: InferredType): boolean =>
	type.kind === 'primitive' && type.type === 'null';

const unwrapNullable = (type: InferredType): { type: InferredType; optional: boolean } => {
	if (isNullable(type)) {
		return { type: { kind: 'unknown' }, optional: true };
	}
	return { type, optional: false };
};

const collectObjectDefinitions = (
	schema: InferredType,
	name: string,
	registry: Map<string, Extract<InferredType, { kind: 'object' }>>,
): void => {
	if (schema.kind !== 'object') return;
	if (!registry.has(name)) {
		registry.set(name, schema);
	}

	for (const [propKey, prop] of Object.entries(schema.properties)) {
		const childName = toPascalCase(propKey);
		const childType = prop.type;

		if (childType.kind === 'object') {
			collectObjectDefinitions(childType, childName, registry);
		}
		if (childType.kind === 'array' && childType.items.kind === 'object') {
			const itemName = toSingularTypeName(propKey);
			collectObjectDefinitions(childType.items, itemName, registry);
		}
	}
};

const buildGenerationPlan = (data: unknown, datasetKey: string): GenerationPlan => {
	const rootName = toPascalCase(datasetKey);
	const registry = new Map<string, Extract<InferredType, { kind: 'object' }>>();

	if (Array.isArray(data)) {
		const itemName = toSingularTypeName(datasetKey);
		const itemType = inferSchemaFromData(data[0] ?? {});
		if (itemType.kind === 'object') {
			collectObjectDefinitions(itemType, itemName, registry);
		}
		return {
			rootName,
			rootType: itemType,
			isArrayRoot: true,
			definitions: Array.from(registry.entries()).map(([name, schema]) => ({ name, schema })),
		};
	}

	const rootType = inferSchemaFromData(data);
	if (rootType.kind === 'object') {
		collectObjectDefinitions(rootType, rootName, registry);
	}

	return {
		rootName,
		rootType,
		isArrayRoot: false,
		definitions: Array.from(registry.entries()).map(([name, schema]) => ({ name, schema })),
	};
};

const tsPrimitive = (type: InferredType, optional: boolean): string => {
	if (type.kind === 'primitive') {
		const map: Record<string, string> = {
			string: 'string',
			number: 'number',
			integer: 'number',
			boolean: 'boolean',
			null: 'null',
		};
		return `${map[type.type]}${optional ? ' | null' : ''}`;
	}
	if (type.kind === 'unknown') return 'unknown';
	if (type.kind === 'array') {
		const item = tsTypeRef(type.items, false);
		return `${item}[]${optional ? ' | null' : ''}`;
	}
	if (type.kind === 'object') return 'Record<string, unknown>';
	return 'unknown';
};

const tsTypeRef = (type: InferredType, optional: boolean, nameHint?: string): string => {
	const { type: inner, optional: nullable } = unwrapNullable(type);
	const isOpt = optional || nullable;

	if (inner.kind === 'object' && nameHint) return `${nameHint}${isOpt ? ' | null' : ''}`;
	if (inner.kind === 'array' && inner.items.kind === 'object' && nameHint) {
		const itemName = toSingularTypeName(nameHint);
		return `${itemName}[]${isOpt ? ' | null' : ''}`;
	}
	return tsPrimitive(inner, isOpt);
};

const renderTsObject = (definition: ObjectDefinition): string => {
	const lines = Object.entries(definition.schema.properties).map(([key, prop]) => {
		const optionalMark = prop.required ? '' : '?';
		const typeName =
			prop.type.kind === 'object'
				? toPascalCase(key)
				: prop.type.kind === 'array' && prop.type.items.kind === 'object'
					? toSingularTypeName(key)
					: undefined;
		return `\t${key}${optionalMark}: ${tsTypeRef(prop.type, !prop.required, typeName)};`;
	});
	return `export interface ${definition.name} {\n${lines.join('\n')}\n}`;
};

const generateTypeScript = (plan: GenerationPlan): string => {
	const nested = plan.definitions
		.filter((def) => def.name !== plan.rootName || !plan.isArrayRoot)
		.map(renderTsObject);

	const rootExport = plan.isArrayRoot
		? `export type ${plan.rootName} = ${toSingularTypeName(plan.rootName)}[];`
		: plan.rootType.kind === 'object'
			? `export type ${plan.rootName} = ${plan.rootName};\n`
			: `export type ${plan.rootName} = ${tsPrimitive(plan.rootType, false)};`;

	if (plan.isArrayRoot && plan.rootType.kind === 'object') {
		return [...nested, rootExport].join('\n\n');
	}
	if (plan.rootType.kind === 'object') {
		const rootDef = plan.definitions.find((def) => def.name === plan.rootName) ?? {
			name: plan.rootName,
			schema: plan.rootType,
		};
		const others = plan.definitions.filter((def) => def.name !== plan.rootName).map(renderTsObject);
		return [...others, renderTsObject(rootDef)].join('\n\n');
	}

	return rootExport;
};

const zodPrimitive = (type: InferredType): string => {
	if (type.kind === 'primitive') {
		const map: Record<string, string> = {
			string: 'z.string()',
			number: 'z.number()',
			integer: 'z.number().int()',
			boolean: 'z.boolean()',
			null: 'z.null()',
		};
		return map[type.type];
	}
	if (type.kind === 'unknown') return 'z.unknown()';
	if (type.kind === 'array') return `z.array(${zodTypeRef(type.items)})`;
	if (type.kind === 'object') return 'z.record(z.unknown())';
	return 'z.unknown()';
};

const zodTypeRef = (type: InferredType, nameHint?: string): string => {
	const { type: inner, optional } = unwrapNullable(type);
	let base: string;
	if (inner.kind === 'object' && nameHint) base = `${toPascalCase(nameHint)}Schema`;
	else if (inner.kind === 'array' && inner.items.kind === 'object' && nameHint) {
		base = `z.array(${toSingularTypeName(nameHint)}Schema)`;
	} else {
		base = zodPrimitive(inner);
	}
	return optional ? `${base}.nullable()` : base;
};

const renderZodObject = (definition: ObjectDefinition): string => {
	const lines = Object.entries(definition.schema.properties).map(([key, prop]) => {
		const typeName =
			prop.type.kind === 'object'
				? key
				: prop.type.kind === 'array' && prop.type.items.kind === 'object'
					? key
					: undefined;
		const value = zodTypeRef(prop.type, typeName);
		return `\t${key}: ${prop.required ? value : `${value}.optional()`},`;
	});
	return `export const ${definition.name}Schema = z.object({\n${lines.join('\n')}\n});`;
};

const generateZod = (plan: GenerationPlan): string => {
	const header = "import { z } from 'zod';\n";
	const nested = plan.definitions
		.filter((def) => def.name !== plan.rootName || !plan.isArrayRoot)
		.map(renderZodObject);

	if (plan.isArrayRoot && plan.rootType.kind === 'object') {
		const itemName = toSingularTypeName(plan.rootName);
		const root = `export const ${plan.rootName}Schema = z.array(${itemName}Schema);`;
		return `${header}\n${nested.join('\n\n')}\n\n${root}`;
	}

	if (plan.rootType.kind === 'object') {
		const rootSchema = renderZodObject({ name: plan.rootName, schema: plan.rootType });
		const others = nested.filter((schema) => schema !== rootSchema);
		return `${header}\n${[...others, rootSchema].join('\n\n')}\n\nexport type ${plan.rootName} = z.infer<typeof ${plan.rootName}Schema>;`;
	}

	return `${header}\nexport const ${plan.rootName}Schema = ${zodPrimitive(plan.rootType)};`;
};

const pgPrimitive = (type: InferredType): string => {
	if (type.kind === 'primitive') {
		const map: Record<string, string> = {
			string: 'TEXT',
			number: 'NUMERIC',
			integer: 'INTEGER',
			boolean: 'BOOLEAN',
			null: 'TEXT',
		};
		return map[type.type];
	}
	if (type.kind === 'array') {
		if (type.items.kind === 'primitive') {
			const item = pgPrimitive(type.items);
			return `${item}[]`;
		}
		return 'JSONB';
	}
	if (type.kind === 'object') return 'JSONB';
	return 'JSONB';
};

const renderPgTable = (tableName: string, definition: ObjectDefinition): string => {
	const columns = Object.entries(definition.schema.properties).map(([key, prop]) => {
		const sqlType = pgPrimitive(prop.type);
		const nullable = prop.required ? 'NOT NULL' : 'NULL';
		return `  ${toSnakeCase(key)} ${sqlType} ${nullable}`;
	});
	return `CREATE TABLE ${tableName} (\n${columns.join(',\n')}\n);`;
};

const generatePostgreSQL = (plan: GenerationPlan): string => {
	const tableName = toSnakeCase(plan.rootName);
	if (plan.isArrayRoot && plan.rootType.kind === 'object') {
		const itemTable = toSnakeCase(toSingularTypeName(plan.rootName));
		const nested = plan.definitions
			.filter((def) => def.name !== toSingularTypeName(plan.rootName))
			.map((def) => renderPgTable(toSnakeCase(def.name), def));
		const main = renderPgTable(itemTable, {
			name: toSingularTypeName(plan.rootName),
			schema: plan.rootType,
		});
		return [...nested, main].join('\n\n');
	}

	if (plan.rootType.kind === 'object') {
		const nested = plan.definitions
			.filter((def) => def.name !== plan.rootName)
			.map((def) => renderPgTable(toSnakeCase(def.name), def));
		const main = renderPgTable(tableName, { name: plan.rootName, schema: plan.rootType });
		return [...nested, main].join('\n\n');
	}

	return `-- Scalar root value; no table generated\n-- Inferred type: ${pgPrimitive(plan.rootType)}`;
};

const jsonSchemaType = (type: InferredType): Record<string, unknown> => {
	if (type.kind === 'primitive') {
		if (type.type === 'null') return { type: 'null' };
		if (type.type === 'integer') return { type: 'integer' };
		return { type: type.type };
	}
	if (type.kind === 'unknown') return {};
	if (type.kind === 'array') {
		return { type: 'array', items: jsonSchemaType(type.items) };
	}
	if (type.kind === 'object') {
		const properties: Record<string, unknown> = {};
		const required: string[] = [];
		for (const [key, prop] of Object.entries(type.properties)) {
			properties[key] = jsonSchemaType(prop.type);
			if (prop.required) required.push(key);
		}
		return {
			type: 'object',
			properties,
			...(required.length ? { required } : {}),
			additionalProperties: false,
		};
	}
	return {};
};

const generateJsonSchema = (plan: GenerationPlan): string => {
	const schema = plan.isArrayRoot
		? { type: 'array', items: jsonSchemaType(plan.rootType) }
		: jsonSchemaType(plan.rootType);

	return JSON.stringify(
		{
			$schema: 'https://json-schema.org/draft/2020-12/schema',
			$id: `${toSnakeCase(plan.rootName)}.schema.json`,
			title: plan.rootName,
			...schema,
		},
		null,
		2,
	);
};

const prismaPrimitive = (type: InferredType): string => {
	if (type.kind === 'primitive') {
		const map: Record<string, string> = {
			string: 'String',
			number: 'Float',
			integer: 'Int',
			boolean: 'Boolean',
			null: 'String?',
		};
		return map[type.type];
	}
	if (type.kind === 'array') return 'Json';
	if (type.kind === 'object') return 'Json';
	return 'Json';
};

const renderPrismaModel = (definition: ObjectDefinition): string => {
	const fields = Object.entries(definition.schema.properties).map(([key, prop]) => {
		const optional = prop.required ? '' : '?';
		return `  ${key} ${prismaPrimitive(prop.type)}${optional}`;
	});
	return `model ${definition.name} {\n${fields.join('\n')}\n}`;
};

const generatePrisma = (plan: GenerationPlan): string => {
	const models = plan.definitions.map(renderPrismaModel);
	if (plan.rootType.kind === 'object' && !plan.definitions.some((d) => d.name === plan.rootName)) {
		models.push(renderPrismaModel({ name: plan.rootName, schema: plan.rootType }));
	}
	return models.join('\n\n');
};

const gqlPrimitive = (type: InferredType, required: boolean): string => {
	if (type.kind === 'primitive') {
		const map: Record<string, string> = {
			string: 'String',
			number: 'Float',
			integer: 'Int',
			boolean: 'Boolean',
			null: 'String',
		};
		return `${map[type.type]}${required ? '!' : ''}`;
	}
	if (type.kind === 'array') {
		const itemRequired = type.items.kind !== 'primitive' || type.items.type !== 'null';
		return `[${gqlTypeRef(type.items, itemRequired, undefined)}]${required ? '!' : ''}`;
	}
	if (type.kind === 'object') return `JSON${required ? '!' : ''}`;
	return `JSON${required ? '!' : ''}`;
};

const gqlTypeRef = (type: InferredType, required: boolean, nameHint?: string): string => {
	const { type: inner, optional } = unwrapNullable(type);
	const isRequired = required && !optional;
	if (inner.kind === 'object' && nameHint) return `${toPascalCase(nameHint)}${isRequired ? '!' : ''}`;
	if (inner.kind === 'array' && inner.items.kind === 'object' && nameHint) {
		return `[${toSingularTypeName(nameHint)}]${isRequired ? '!' : ''}`;
	}
	return gqlPrimitive(inner, isRequired);
};

const renderGraphQLType = (definition: ObjectDefinition): string => {
	const fields = Object.entries(definition.schema.properties).map(([key, prop]) => {
		const typeName =
			prop.type.kind === 'object'
				? key
				: prop.type.kind === 'array' && prop.type.items.kind === 'object'
					? key
					: undefined;
		return `  ${key}: ${gqlTypeRef(prop.type, prop.required, typeName)}`;
	});
	return `type ${definition.name} {\n${fields.join('\n')}\n}`;
};

const generateGraphQL = (plan: GenerationPlan): string => {
	const types = plan.definitions.map(renderGraphQLType);
	if (plan.rootType.kind === 'object' && !plan.definitions.some((d) => d.name === plan.rootName)) {
		types.push(renderGraphQLType({ name: plan.rootName, schema: plan.rootType }));
	}
	return types.join('\n\n');
};

const mongoosePrimitive = (type: InferredType): string => {
	if (type.kind === 'primitive') {
		const map: Record<string, string> = {
			string: 'String',
			number: 'Number',
			integer: 'Number',
			boolean: 'Boolean',
			null: 'String',
		};
		return map[type.type];
	}
	if (type.kind === 'array') return `[${mongoosePrimitive(type.items)}]`;
	if (type.kind === 'object') return 'Schema.Types.Mixed';
	return 'Schema.Types.Mixed';
};

const renderMongooseObject = (definition: ObjectDefinition): string => {
	const fields = Object.entries(definition.schema.properties).map(([key, prop]) => {
		if (prop.type.kind === 'object') {
			return `\t${key}: ${toPascalCase(key)}Schema`;
		}
		if (prop.type.kind === 'array' && prop.type.items.kind === 'object') {
			return `\t${key}: [${toSingularTypeName(key)}Schema]`;
		}
		const required = prop.required ? ', required: true' : '';
		return `\t${key}: { type: ${mongoosePrimitive(prop.type)}${required} }`;
	});

	return `const ${definition.name}Schema = new Schema({\n${fields.join(',\n')}\n});`;
};

const generateMongoose = (plan: GenerationPlan): string => {
	const header = "import { Schema } from 'mongoose';\n";
	const schemas = plan.definitions.map(renderMongooseObject);
	if (plan.rootType.kind === 'object' && !plan.definitions.some((d) => d.name === plan.rootName)) {
		schemas.push(renderMongooseObject({ name: plan.rootName, schema: plan.rootType }));
	}
	const modelName = plan.isArrayRoot ? toSingularTypeName(plan.rootName) : plan.rootName;
	const exportLine = `export const ${modelName}Model = model('${modelName}', ${modelName}Schema);`;
	return `${header}\n${schemas.join('\n\n')}\n\nimport { model } from 'mongoose';\n${exportLine}`;
};

const generators: Record<SchemaFormat, (plan: GenerationPlan) => string> = {
	typescript: generateTypeScript,
	zod: generateZod,
	postgresql: generatePostgreSQL,
	'json-schema': generateJsonSchema,
	prisma: generatePrisma,
	graphql: generateGraphQL,
	mongoose: generateMongoose,
};

export const generateSchema = (data: unknown, format: SchemaFormat, datasetKey: string): string => {
	const plan = buildGenerationPlan(data, datasetKey);
	return generators[format](plan);
};

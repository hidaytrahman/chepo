# Chepo

**Chepo** is the easiest way to browse, search, and copy mock data for your project — plus inferred schemas in TypeScript, Zod, PostgreSQL, and other popular formats.

**Live app:** [https://hidaytrahman.github.io/chepo/](https://hidaytrahman.github.io/chepo/)

<a href="https://www.producthunt.com/posts/chepo?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-chepo" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=480988&theme=dark" alt="Chepo - Get generated data with a single click | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

<img src="https://ph-files.imgix.net/f2def677-a3b3-4ea4-a0d2-ed4814cca237.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=685&h=320&fit=max&dpr=2" alt="Chepo screenshot" style="width: 780px; height: 200px;" width="780" height="200" />

<img src="https://ph-files.imgix.net/290e9483-2fc0-4f05-9717-0d327267a117.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=668&h=320&fit=max&dpr=2" alt="Chepo screenshot" style="width: 780px; height: 200px;" width="780" height="200" />

## Features

### Browse & search mock data

- **Searchable catalog** — find datasets by name, tag, or category
- **Category filters** — User & Identity, Media, E-commerce, Locale, Finance, Marketing, UI
- **Featured examples** — quick access to popular datasets from the homepage
- **One-click copy** — copy formatted JSON straight into your editor

### Shareable deep links

Link directly to any dataset using the `model` query parameter:

```
https://hidaytrahman.github.io/chepo/?model=users
https://hidaytrahman.github.io/chepo/?model=products
```

The URL updates as you browse, so you can bookmark or share a specific dataset.

### Schema variants

Switch to the **Schema** tab on any dataset to get an inferred schema you can copy in your preferred format:

| Format | Output |
|--------|--------|
| **TypeScript** | `interface` and `type` definitions |
| **Zod** | Runtime validation schemas (`z.object`, `z.infer`) |
| **PostgreSQL** | `CREATE TABLE` DDL |
| **JSON Schema** | Draft 2020-12 document |
| **Prisma** | `model` blocks |
| **GraphQL** | `type` definitions |
| **Mongoose** | MongoDB `Schema` definitions |

Schemas are inferred from the sample data shape — nested objects, arrays, nullables, and primitives are detected automatically.

### Lazy-loaded datasets

Datasets are loaded on demand, not bundled into the initial page load. Each dataset is fetched only when you select it, keeping the app fast as the catalog grows.

### Contributor-friendly JSON manifest

Catalog metadata lives in [`src/data/manifest.json`](src/data/manifest.json). Non-TypeScript contributors can add datasets by dropping a JSON file and updating the manifest — no React or build tooling knowledge required for the data itself.

## Using Chepo

1. Open [the live app](https://hidaytrahman.github.io/chepo/) or run it locally (`npm run dev`)
2. Search or filter datasets in the browser panel
3. Select a dataset to preview its JSON
4. Click **Mock data** for sample JSON, or **Schema** for type definitions
5. Use the copy button to paste into your project

### Example mock data

```json
[
  {
    "id": 1,
    "title": "Buy milk",
    "isCompleted": false
  }
]
```

### Example generated TypeScript (from the same data)

```typescript
export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export type Todos = Todo[];
```

## Adding a dataset

### Option A — JSON dataset (recommended for contributors)

1. Add your file to [`src/data/datasets/`](src/data/datasets/) (e.g. `orders.json`)
2. Register a lazy loader in [`src/model/jsonLoaders.ts`](src/model/jsonLoaders.ts)
3. Append an entry to [`src/data/manifest.json`](src/data/manifest.json):

```json
{
  "key": "orders",
  "title": "Orders",
  "description": "E-commerce order list with line items",
  "category": "commerce",
  "tags": ["order", "purchase", "checkout"],
  "source": { "type": "json", "file": "orders.json" }
}
```

Optional flags: `"featured": true`, `"isNew": true`

### Option B — TypeScript dataset

1. Export your data from a file under [`src/model/`](src/model/)
2. Add a lazy loader in [`src/model/loaders.ts`](src/model/loaders.ts)
3. Append a manifest entry with `"source": { "type": "module" }`

### Manifest fields

| Field | Required | Description |
|-------|----------|-------------|
| `key` | Yes | Unique identifier (used in URLs: `?model=key`) |
| `title` | Yes | Display name |
| `description` | Yes | Short description for the browser |
| `category` | Yes | `user`, `media`, `commerce`, `locale`, `finance`, `marketing`, or `ui` |
| `tags` | Yes | Search keywords and synonyms |
| `source` | Yes | `{ "type": "json", "file": "..." }` or `{ "type": "module" }` |
| `featured` | No | Show in homepage popular examples |
| `isNew` | No | Display a "New" badge in the browser |

## Project structure

```
src/
├── data/
│   ├── manifest.json          # Catalog metadata (single source of truth)
│   └── datasets/              # JSON datasets
├── model/
│   ├── loaders.ts             # Lazy loaders for TypeScript datasets
│   ├── jsonLoaders.ts         # Lazy loaders for JSON datasets
│   ├── registry.ts            # Builds catalog from manifest
│   └── dataLoader.ts          # Async load + cache
├── utils/
│   ├── search.utils.ts        # Search and catalog helpers
│   └── schema/                # Schema inference and generators
├── hooks/
│   ├── useMockDataset.ts      # Lazy data fetching hook
│   └── useModelUrl.ts         # URL deep link sync
└── components/
    ├── utils/ModelBrowser.tsx # Searchable category browser
    ├── utils/DatasetViewer.tsx# Mock data / Schema toggle
    └── utils/schema/SchemaViewer.tsx
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## API

Coming soon.

## Tech stack

React, TypeScript, Vite, Tailwind CSS, MUI, Headless UI, Phosphor Icons

## License

See repository license file.

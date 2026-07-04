import {
	ArrowDown,
	Code,
	Copy,
	Database,
	GitBranch,
	Lightning,
	ShareNetwork,
} from 'phosphor-react';
import FeaturedModels from '../../utils/FeaturedModels';
import { SCHEMA_FORMATS } from '../../../utils/schema';

function HeaderPanel({
	setSearchTerm,
	setSelectedKey,
}: {
	setSearchTerm: (value: string) => void;
	setSelectedKey: (value: string) => void;
}) {
	const handleSelect = (key: string) => {
		setSelectedKey(key);
		setSearchTerm(key);
		document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' });
	};

	const features = [
		{
			icon: Copy,
			title: 'Copy mock JSON',
			description: 'Realistic sample data for users, products, carts, and more.',
		},
		{
			icon: Code,
			title: 'Schema variants',
			description: 'Export inferred types in TypeScript, Zod, SQL, and other formats.',
		},
		{
			icon: ShareNetwork,
			title: 'Shareable links',
			description: 'Deep link any dataset with ?model=users in the URL.',
		},
		{
			icon: Lightning,
			title: 'Lazy loaded',
			description: 'Datasets load on demand — fast even as the catalog grows.',
		},
	];

	return (
		<div className='relative overflow-hidden'>
			<div className='hero-grid pointer-events-none absolute inset-0' aria-hidden='true' />
			<div className='hero-glow pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl' />
			<div className='hero-glow pointer-events-none absolute top-20 right-0 h-72 w-72 rounded-full bg-violet-400/15 blur-3xl' />

			<div className='relative mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-12'>
				<div className='mx-auto max-w-3xl text-center'>
					<div className='mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/80 px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur-sm'>
						<span className='relative flex h-2 w-2'>
							<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75' />
							<span className='relative inline-flex h-2 w-2 rounded-full bg-indigo-500' />
						</span>
						v2.0 — Mock data &amp; schema generator
					</div>

					<h1 className='text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl'>
						Mock data and{' '}
						<span className='bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>
							schemas
						</span>
						, ready to copy
					</h1>

					<p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl'>
						Browse curated datasets, copy JSON into your project, or switch to Schema mode for
						TypeScript, Zod, PostgreSQL, Prisma, GraphQL, and more — all inferred from the data.
					</p>

					<div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
						<a
							href='#browse'
							className='inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500'
						>
							Browse datasets
							<ArrowDown size={18} weight='bold' />
						</a>
						<a
							href='https://www.producthunt.com/products/chepo?utm_source=badge-featured&utm_medium=badge#chepo'
							target='_blank'
							rel='noreferrer'
							className='inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition hover:border-slate-300 hover:bg-white'
						>
							Featured on Product Hunt
						</a>
					</div>
				</div>

				<div className='mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					{features.map(({ icon: Icon, title, description }) => (
						<div
							key={title}
							className='group rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition hover:border-indigo-200 hover:shadow-md'
						>
							<div className='mb-3 inline-flex rounded-xl bg-indigo-50 p-2.5 text-indigo-600 transition group-hover:bg-indigo-100'>
								<Icon size={22} weight='duotone' />
							</div>
							<h3 className='font-semibold text-slate-900'>{title}</h3>
							<p className='mt-1 text-sm leading-relaxed text-slate-500'>{description}</p>
						</div>
					))}
				</div>

				<div className='mt-12 rounded-2xl border border-slate-200/80 bg-white/60 p-6 shadow-sm backdrop-blur-sm sm:p-8'>
					<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
						<div className='flex items-start gap-3'>
							<div className='rounded-xl bg-violet-50 p-2.5 text-violet-600'>
								<Database size={22} weight='duotone' />
							</div>
							<div>
								<h2 className='text-lg font-semibold text-slate-900'>Schema export formats</h2>
								<p className='text-sm text-slate-500'>
									Select any dataset → Schema tab → copy in your stack
								</p>
							</div>
						</div>
						<div className='flex items-center gap-1.5 text-xs text-slate-400'>
							<GitBranch size={14} />
							Inferred from sample data
						</div>
					</div>
					<div className='mt-5 flex flex-wrap gap-2'>
						{SCHEMA_FORMATS.map((format) => (
							<span
								key={format.id}
								className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700'
								title={format.description}
							>
								{format.label}
							</span>
						))}
					</div>
				</div>

				<div className='mt-12 text-center'>
					<p className='mb-4 text-sm font-medium uppercase tracking-wider text-slate-400'>
						Try a popular dataset
					</p>
					<FeaturedModels onSelect={handleSelect} />
				</div>
			</div>
		</div>
	);
}

export default HeaderPanel;

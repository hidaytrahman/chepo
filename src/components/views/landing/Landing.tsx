import { useState } from 'react';
import { GithubLogo } from 'phosphor-react';
import './Landing.css';
import HeaderPanel from '../../features/HeaderPanel/HeaderPanel';
import SearchPanel from '../../features/SearchPanel/SearchPanel';
import { getInitialModelFromUrl } from '../../../hooks/useModelUrl';

const logo = `${import.meta.env.BASE_URL}images/logo.png`;
const homeHref = import.meta.env.BASE_URL;

export default function Landing() {
	const initialModel = getInitialModelFromUrl();
	const [searchTerm, setSearchTerm] = useState<string>(initialModel);
	const [selectedKey, setSelectedKey] = useState<string>(initialModel);

	return (
		<div className='landing-page min-h-screen bg-slate-50'>
			<header className='sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md'>
				<nav
					className='mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8'
					aria-label='Global'
				>
					<a href={homeHref} className='flex items-center gap-3'>
						<img className='logo' loading='lazy' src={logo} alt='Chepo logo' />
						<span className='hidden text-sm font-semibold text-slate-800 sm:inline'>Chepo</span>
					</a>

					<div className='flex items-center gap-3 sm:gap-4'>
						<a
							href='#browse'
							className='hidden text-sm font-medium text-slate-600 transition hover:text-indigo-600 sm:inline'
						>
							Browse
						</a>
						<a
							href='https://github.com/hidaytrahman/chepo'
							target='_blank'
							rel='noreferrer'
							className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800'
							aria-label='GitHub repository'
						>
							<GithubLogo size={22} weight='duotone' />
						</a>
						<a
							href='https://www.producthunt.com/posts/chepo?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-chepo'
							target='_blank'
							rel='noreferrer'
							className='shrink-0'
						>
							<img
								src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=480988&theme=light'
								alt='Chepo on Product Hunt'
								className='h-10 w-auto sm:h-[44px]'
								width='200'
								height='44'
							/>
						</a>
					</div>
				</nav>
			</header>

			<main>
				<HeaderPanel setSearchTerm={setSearchTerm} setSelectedKey={setSelectedKey} />
				<SearchPanel
					setSearchTerm={setSearchTerm}
					searchTerm={searchTerm}
					selectedKey={selectedKey}
					setSelectedKey={setSelectedKey}
				/>
			</main>

			<footer className='border-t border-slate-200 bg-white py-8'>
				<div className='mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8'>
					<p className='text-sm text-slate-500'>
						Chepo — mock data &amp; schema tooling for developers. Copy JSON or export types in
						seconds.
					</p>
					<p className='mt-2 text-xs text-slate-400'>
						Built by{' '}
						<a
							href='https://hidaytrahman.github.io/'
							target='_blank'
							rel='noreferrer'
							className='text-indigo-600 hover:text-indigo-800'
						>
							Hidayt Rahman
						</a>
					</p>
				</div>
			</footer>
		</div>
	);
}

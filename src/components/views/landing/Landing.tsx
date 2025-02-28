import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'phosphor-react';
import './Landing.css';
import HeaderPanel from '../../features/HeaderPanel/HeaderPanel';
import SearchPanel from '../../features/ModalPanel/ModalPanel';

const logo = '/chepo/images/logo.png';

const navigation = [
	{ name: 'Product', href: '#' },
	{ name: 'Features', href: '#' },
];

export default function Landing() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const [searchTerm, setSearchTerm] = useState<string>('');

	return (
		<div className='isolate bg-white'>
			<div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'>
				<svg
					className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
					viewBox='0 0 1155 678'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
						fillOpacity='.3'
						d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
					/>
					<defs>
						<linearGradient
							id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
							x1='1155.49'
							x2='-78.208'
							y1='.177'
							y2='474.645'
							gradientUnits='userSpaceOnUse'
						>
							<stop stopColor='#9089FC' />
							<stop offset={1} stopColor='#FF80B5' />
						</linearGradient>
					</defs>
				</svg>
			</div>
			<div className='px-6 pt-6 lg:px-8'>
				<nav className='flex items-center justify-between' aria-label='Global'>
					<div className='flex lg:flex-1'>
						<img className='logo' loading='lazy' src={logo} alt='chepo logo' />
					</div>

					<a
						href='https://www.producthunt.com/posts/chepo?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-chepo'
						target='_blank'
						referrerPolicy='no-referrer'
					>
						<img
							src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=480988&theme=light'
							alt='Chepo - Get&#0032;generated&#0032;data&#0032;with&#0032;a&#0032;single&#0032;click | Product Hunt'
							style={{ width: '250px', height: '54px' }}
							width='250'
							height='54'
						/>
					</a>

					{/* <div className='flex lg:hidden'>
						<button
							type='button'
							className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className='sr-only'>Open main menu</span>
							<List className='h-6 w-6' aria-hidden='true' />
						</button>
					</div> */}
					{/* <div className='hidden lg:flex lg:gap-x-12'>
						{false &&
							navigation.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className='text-sm font-semibold leading-6 text-gray-900'
								>
									{item.name}
								</a>
							))}
					</div> */}
				</nav>
				<Dialog as='div' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
					<Dialog.Panel
						//   @ts-ignore
						focus='true'
						className='fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden'
					>
						<div className='flex items-center justify-between'>
							<a href='#' className='-m-1.5 p-1.5'>
								<span className='sr-only'>Chepo</span>
								<img className='logo' loading='lazy' src={logo} alt='chepo logo' />
							</a>
							<button
								type='button'
								className='-m-2.5 rounded-md p-2.5 text-gray-700'
								onClick={() => setMobileMenuOpen(false)}
							>
								<span className='sr-only'>Close menu</span>
								<X className='h-6 w-6' aria-hidden='true' />
							</button>
						</div>
						<div className='mt-6 flow-root'>
							<div className='-my-6 divide-y divide-gray-500/10'>
								<div className='space-y-2 py-6'>
									{navigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
										>
											{item.name}
										</a>
									))}
								</div>
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			</div>
			<main>
				<HeaderPanel setSearchTerm={setSearchTerm} />
				<SearchPanel setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
			</main>
		</div>
	);
}

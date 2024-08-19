import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'phosphor-react';
import './Landing.css';

import JsonViewer from '../../utils/jsonViewer/JsonViewer';
import { modal } from '../../../model';
import { dataList } from '../../../utils/search.utils';
import DataEntity from '../../utils/DataEntity';

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
					{/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
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
								{/* <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >
                    Log in
                  </a>
                </div> */}
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			</div>
			<main>
				<div className='relative px-6 lg:px-8'>
					<div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
						{/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Announcing our next round of funding.{" "}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div> */}
						<div className='text-center'>
							<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
								Easiest way to get mock data
							</h1>
							<p className='mt-6 text-lg leading-8 text-gray-600'>
								Chepo is the easiest way to provide mock data and modal for your project. <br />
								Just copy and paste it into your project. You can use the generated data without any
								additional effort.
							</p>
							<div className='mt-10 flex items-center justify-center gap-x-6'>
								<div className='my-4 '>
									<div className='text-gray-400 text-lg pb-6'>Examples</div>

									<DataEntity setColor={setSearchTerm} />
								</div>
								{/* <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a> */}
								{/* <a
                  href="#"
                  className="text-base font-semibold leading-7 text-gray-900"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a> */}
							</div>
						</div>
					</div>
					<div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
						<svg
							className='relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]'
							viewBox='0 0 1155 678'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fill='url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)'
								fillOpacity='.3'
								d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
							/>
							<defs>
								<linearGradient
									id='ecb5b0c9-546c-4772-8c71-4d3f06d544bc'
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
				</div>
			</main>

			<section
				style={{
					padding: '4rem',
					maxWidth: 1024,
					margin: '0 auto',
				}}
			>
				<div>
					<label htmlFor='search' className='title-big'>
						Search Data
					</label>
					<input
						className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						type='text'
						placeholder='e.g user, months, products'
						list='mockdata'
						id='search'
						onChange={(e) => {
							setSearchTerm(e.target.value);
						}}
					/>

					<div className='my-4'>
						<span className='my-2 inline-block'>or choose from:</span>
						<br />
						<DataEntity setColor={setSearchTerm} />
					</div>

					<hr />

					<datalist id='mockdata'>
						{dataList.map((data) => (
							<option key={data.id} value={data.name} />
						))}
						{/* <option value='todos' />
						<option value='videoPlayer' />
						<option value='audioPlayer' />
						<option value='products' />
						<option value='productCategories' />
						<option value='slideSettings' />
						<option value='languages' />
						<option value='photosFull' />
						<option value='photosShort' />
						<option value='githubUser' />
						<option value='users' />
						<option value='months' />
						<option value='monthsShort' />
						<option value='week' />
						<option value='weekShort' /> */}
					</datalist>
				</div>

				{modal[searchTerm] ? (
					<JsonViewer data={modal[searchTerm]} title={searchTerm} />
				) : (
					<JsonViewer data={modal.videoPlayer} title='Example: videoPlayer' />
				)}

				<hr />

				{/* Render dynamically */}

				{/* <JsonViewer data={users} title="User" /> */}
				{/* <JsonViewer data={githubUser} title='Github user' /> */}
				{/* <JsonViewer data={photosShort} title="Photos Short" /> */}
				{/* <JsonViewer data={photosFull} title="Photos Full" /> */}
			</section>
		</div>
	);
}

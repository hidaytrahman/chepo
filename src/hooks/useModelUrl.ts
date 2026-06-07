import { useEffect } from 'react';
import { getRegistryEntry } from '../model/registry';

const MODEL_PARAM = 'model';

export const getInitialModelFromUrl = (): string => {
	if (typeof window === 'undefined') return '';

	const model = new URLSearchParams(window.location.search).get(MODEL_PARAM)?.trim();
	if (!model) return '';

	return getRegistryEntry(model) ? getRegistryEntry(model)!.key : '';
};

export const buildModelUrl = (key: string): string => {
	const url = new URL(window.location.href);
	if (key) {
		url.searchParams.set(MODEL_PARAM, key);
	} else {
		url.searchParams.delete(MODEL_PARAM);
	}
	return `${url.pathname}${url.search}${url.hash}`;
};

export const useModelUrl = (activeModel: string): void => {
	useEffect(() => {
		if (typeof window === 'undefined' || !activeModel) return;
		if (!getRegistryEntry(activeModel)) return;

		const nextUrl = buildModelUrl(activeModel);
		const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

		if (nextUrl !== currentUrl) {
			window.history.replaceState(null, '', nextUrl);
		}
	}, [activeModel]);
};

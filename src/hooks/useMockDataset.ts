import { useEffect, useState } from 'react';
import { loadMockData } from '../model/dataLoader';
import { getRegistryEntry } from '../model/registry';

type UseMockDatasetResult = {
	data: unknown;
	loading: boolean;
	error: Error | null;
};

export const useMockDataset = (key: string): UseMockDatasetResult => {
	const [data, setData] = useState<unknown>(null);
	const [loading, setLoading] = useState(Boolean(key));
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!key || !getRegistryEntry(key)) {
			setData(null);
			setLoading(false);
			setError(null);
			return;
		}

		let cancelled = false;
		setLoading(true);
		setError(null);

		loadMockData(key)
			.then((result) => {
				if (!cancelled) setData(result);
			})
			.catch((err: unknown) => {
				if (!cancelled) {
					setError(err instanceof Error ? err : new Error(String(err)));
					setData(null);
				}
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [key]);

	return { data, loading, error };
};

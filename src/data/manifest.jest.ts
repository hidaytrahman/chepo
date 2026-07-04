import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { Manifest } from '../model/types';

const manifest: Manifest = JSON.parse(
	readFileSync(resolve(__dirname, 'manifest.json'), 'utf-8'),
) as Manifest;

export default manifest;

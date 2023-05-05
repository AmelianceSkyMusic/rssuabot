import { returnError as returnErr } from '~/src/ameliance-scripts/scripts';
import { APP } from '~constants/APP';

export function returnError(error: unknown): string {
	return returnErr(error, APP.name, 1);
}

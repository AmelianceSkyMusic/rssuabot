import { returnError as returnErr } from '../../ameliance-scripts/scripts';
import { APP } from '../constants/APP';

export function returnError(error: unknown): string {
	return returnErr(error, `ERROR: ${APP.name}`, 1);
}

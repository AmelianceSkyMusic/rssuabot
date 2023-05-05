import { joinWith } from '../../../ameliance-scripts/scripts';

export function generateFullName(userFirstName: string, userLastName: string): string {
	return joinWith(' ', [userFirstName, userLastName]);
}

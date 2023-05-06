import { returnError } from '../../helpers/returnError';
import type { Ctx } from '../../types/Ctx';
import { helpers } from '.';

export async function sendMessageHTML(
	ctx: Ctx,
	text: string,
	mode?: 'mention' | '',
	params: Record<string, string> = {},
) {
	try {
		const message = await helpers.sendMessage(
			ctx,
			text,
			mode,
			{
				parse_mode: 'HTML',
				...params,
			},
		);
		return message;
	} catch (error) {
		returnError(error);
	}
	return null;
}

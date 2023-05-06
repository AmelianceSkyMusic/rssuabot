import type { Ctx } from '../../types/Ctx';
import { helpers } from '.';

export function generateUserFullNameTag(ctx: Ctx): string {
	const messageFrom = ctx.msg?.from;
	const messageUserId = messageFrom?.id;
	const messageUserFirstName = messageFrom?.first_name || '';
	const messageUserLastName = messageFrom?.last_name || '';
	const messageUserFullNameName = helpers.generateFullName(
		messageUserFirstName,
		messageUserLastName,
	);

	return helpers.generateUserTag(messageUserId || '', messageUserFullNameName);
}

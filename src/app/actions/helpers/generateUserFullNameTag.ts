import type { Ctx } from '../../types/Ctx';
import { helpers } from '.';

export function generateUserFullNameTag(ctx: Ctx): string {
	const messageUserId = ctx.msg.from?.id;
	const messageUserFirstName = ctx.msg.from?.first_name || '';
	const messageUserLastName = ctx.msg.from?.last_name || '';
	const messageUserFullNameName = helpers.generateFullName(
		messageUserFirstName,
		messageUserLastName,
	);

	return helpers.generateUserTag(messageUserId || '', messageUserFullNameName);
}

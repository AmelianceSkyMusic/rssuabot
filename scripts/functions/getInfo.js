// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default async function getInfo(ctx, type = '') {
	try {
		const info = {};
		const userInfo = await f.getUserInfo(ctx);

		info.userId           = userInfo.userId;
		info.userIsBot        = userInfo.userIsBot;
		info.userFirstName    = userInfo.userFirstName;
		info.userUsername     = userInfo.userUsername;
		info.userLanguageCode = userInfo.userLanguageCode;
		info.userMentionHTML  = userInfo.userMentionHTML;
		info.userStatus       = userInfo.userStatus;
		info.userText         = userInfo.userText;
		info.userIsAnonymous  = userInfo.userIsAnonymous;
		info.userDate  		 = userInfo.userDate;
		info.userDateShort  	 = userInfo.userDateShort;


		if (type === 'REPLY') {
			const replyInfo = await f.getReplyInfo(ctx);
			if (replyInfo) {
				info.replyId         	= replyInfo.replyId;
				info.replyIsBot      	= replyInfo.replyIsBot;
				info.replyFirstName  	= replyInfo.replyFirstName;
				info.replyUsername   	= replyInfo.replyUsername;
				info.replyMentionHTML	= replyInfo.replyMentionHTML;
				info.replyStatus     	= replyInfo.replyStatus;
				info.replyText       	= replyInfo.replyText;
				info.replyIsAnonymous	= replyInfo.replyIsAnonymous;
				info.userDate				= replyInfo.userDate;
				info.userDateShort		= replyInfo.userDateShort;
			}
		}

		return info;
	} catch (error) {
		f.error('logsUserReply', error);
	}
}

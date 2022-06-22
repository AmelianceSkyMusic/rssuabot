// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

const { botHelp } = require('./botHelp');
const { botCommandSimple } 		= require('./botCommandSimple');

const { botCommandChannelPost } = require('./botCommandChannelPost');
const { botCommandChatMember } 	= require('./botCommandChatMember');
const { botCommandBanpoll } 	= require('./botCommandBanpoll');

const { botCommandAdmins } 		= require('./botCommandAdmins');
const { botCommandTest } 		= require('./botCommandTest');
const { botCommandInfo } 		= require('./botCommandInfo');
const { botCommandMute } 		= require('./botCommandMute');
const { botCommandUnmute } 		= require('./botCommandUnmute');




// >----------------------------------------------------------------<
// >                             EXPORT                             <
// >----------------------------------------------------------------<

module.exports = {
	botHelp,
	botCommandSimple,

	botCommandChannelPost,
	botCommandChatMember,
	botCommandBanpoll,

	botCommandAdmins,
	botCommandTest,
	botCommandInfo,
	botCommandMute,
	botCommandUnmute,
}

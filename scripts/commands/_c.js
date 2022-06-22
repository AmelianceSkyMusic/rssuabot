// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<


const { botHelp } 					= require('./botHelp');
const { botCommandSimple } 			= require('./botCommandSimple');

const { botCommandNewChatMembers } 	= require('./botCommandNewChatMembers');
const { botCommandLeftChatMember } 	= require('./botCommandLeftChatMember');

const { botCommandReply } 			= require('./botCommandReply');
const { botCommandRp } 				= require('./botCommandRp');
const { botCommandTwo } 			= require('./botCommandTwo');
const { botCommandRandom } 			= require('./botCommandRandom');

const { botCommandChannelPost } 	= require('./botCommandChannelPost');
const { botCommandChatMember } 		= require('./botCommandChatMember');
const { botCommandBanpoll } 		= require('./botCommandBanpoll');

const { botCommandAdmins } 			= require('./botCommandAdmins');
const { botCommandTest } 			= require('./botCommandTest');
const { botCommandInfo } 			= require('./botCommandInfo');
const { botCommandMute } 			= require('./botCommandMute');
const { botCommandUnmute } 			= require('./botCommandUnmute');




// >----------------------------------------------------------------<
// >                             EXPORT                             <
// >----------------------------------------------------------------<

module.exports = {

	botHelp,
	botCommandSimple,

	botCommandNewChatMembers,
	botCommandLeftChatMember,

	botCommandReply,
	botCommandRp,
	botCommandTwo,
	botCommandRandom,

	botCommandChannelPost,
	botCommandChatMember,
	botCommandBanpoll,


	botCommandAdmins,
	botCommandTest,
	botCommandInfo,
	botCommandMute,
	botCommandUnmute,

}

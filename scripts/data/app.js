
const APP = {test: 'test'};
// APP.users = { test: 'test'};
APP.messages = {testMessageID: [1, 2]};
APP.inlineKeyboards = {};

APP.TEST_CHAT_ID = -1001799287707;
APP.RSSUA_CHAT_ID = -1001315899508;
APP.RSS2022Q1UA_CHAT_ID = -1001730193639;
APP.RSSUA_ONTOPIC_CHAT_ID = -1001723989874;

APP.UNRESTRICT_OPTIONS = {
	can_send_messages: true,
	can_send_media_messages: true,
	can_send_other_messages: true,
	can_add_web_page_previews: true,
	can_send_polls: true,
	can_invite_users: true,
	can_pin_messages: true,
	can_change_info: true,
};



// >----------------------------------------------------------------<
// >                            EXPORTS                             <
// >----------------------------------------------------------------<

export default APP;

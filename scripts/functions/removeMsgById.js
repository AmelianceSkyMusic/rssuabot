// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

const { log } = require('console');

const asm = require('../modules/_asm');



// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

module.exports.removeMsgById = async (ctx, msgId, sec) => {
	setTimeout( async () => { // remove messages
		try {
			await ctx.deleteMessage(msgId);
		} catch (error) {
			log(`ASM: Maybe message ${msgId} was removed by the user\n${error}`) }
	}, asm.secToMs(sec));
}

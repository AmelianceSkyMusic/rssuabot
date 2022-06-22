// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

const { APP } = require("../data/app");




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

module.exports.addButtonActon = (name, callback) => {
	APP.BOT.action(name, async (ctx) => {
		try {
			await callback(ctx);
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error); }
	})
}

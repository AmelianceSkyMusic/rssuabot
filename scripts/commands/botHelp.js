// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

const constants = require('../data/constants');


// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

module.exports.botHelp = (bot) => {
    bot.help((ctx) => ctx.reply(constants.commands));
};
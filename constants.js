const commands = `
/help - show help
/app - get link to the app
/coursejsfe - get link to the course js fe
/roadmap - get link to the roadmap
/docs - get link to the documentation
/dismission - get link to the dismission
/registration - get link to the registration
/codeofconduct - get link to the code of conduct
/stickers - get link to the stickers
/random - get random phrase
/reply - reply with random phrase
/banpool - ban pool for user
/anonymousbanpool - anonymous ban pool for user
`

const githubUrl = '<a href="https://github.com/AmelianceSkyMusic">github</a>'

// wellcomeMessage = `
// ${ctx.message.new_chat_members ? ctx.message.new_chat_members : 'user'}, вітаємо тебе українською мовою.
// Ознайомся, будь ласка, з закріпленими повідомленнями!
// `

const inlineNoUserMessages = [
    `, шо ти тицяєш? То не тобі😅`,
    `, що ти собі дозволяєш?😅`,
    `, я так і знав, що ти не втримаєшся😅`,
    `, тобі більше немає чим зайнятися?😅`,
    `, ти думаєш це магічна кнопкочка?😅`,
    `, а в тебе що, такої не було?😅`,
    `, знав би адмін чим ти займаєшся😅`,
    `, мені що адміна покликати?😅`,
    `, ооооо, ось я тебе і зловив😅`,
    `, ти йому допомогти хочеш?`,
    `, краще ділом займись😅`,
    `, хочеш щось зламати?😅`,
    `, давай ще!😅`,
    `, аби ділом не займатись!😅`,
    `, прокрастинуєш?😅`,
    `, адміна покликати?😅`,
    `, я сподіваюсь палець зісковзнув?😅`,
    `, тобі показати звідки повідомлення беруться?😅`,
    `, я від тебе іншого і не очікував😅`,
    `, хто ж це ще міг бути😅`,
    `, хочеш на бан наклацати?😅`,
    `, ох вже ці студенти😅`,
    `, побавились і досить!😅`,
    `, це тобі не лотерея!😅`,
    `, а б на твому місці краще чимось корисним зайнявся!😅`,
    `, а по попі?😅`,
    `, краще закріплені почитай😅`,
    `, чого ця кнопочка тебе так манить😅`,
    `, де ж ще така кнопочка є?😅`,
    `, треба було одразу ще 10 раз натиснути😅`,
    `, а тобі мама дозволяла?😅`,
    `, ще скажи, що то така звичка?😅`,
    `, вже кличу адміна😅`,
    `, а ти точно програміст?😅`,
    `, сідай, 2!😅`,
    `, ти думаєш я тут просто так?😅`,
    `, чого в тебе нік такий дивний?😅`,
    `, і що ти очікував побачити?😅`,
    `, ти думаєш ця кнопочка жарти генерує?😅`,
    `, ти точно маєш на це час?😅`,
    `, ти реально хочеш тицяти поки не побачиш усі 41 фразу?😅`,
]

module.exports = {
    commands,
    githubUrl,
    inlineNoUserMessages
    // wellcomeMessage,
}

const commands = `
/start — start bot
/help — show help
`

const githubUrl = '<a href="https://github.com/AmelianceSkyMusic">github</a>'

// wellcomeMessage = `
// ${ctx.message.new_chat_members ? ctx.message.new_chat_members : 'user'}, вітаємо тебе українською мовою.
// Ознайомся, будь ласка, з закріпленими повідомленнями!
// `

const inlineNoUserMessages = [
    `, шо ти тицяєш? То не тобі😅`,
    `, що ти собі дозволяєш?`,
    `, я так і знав, що ти не втримаєшся😅`,
    `, тобі більше немає чим зайнятися?`,
    `, ти думаєш це магічна кнопка?`,
    `, а в тебе що, такої не було?`,
    `, знав би адмін чим ти займаєшся😅`,
    `, мені що адміна покликати?`,
    `, ооооо, ось я тебе і зловив😅`,
    `, ти йому допомогти хочеш?`,
    `, краще ділом займись😅`,
    `, хочеш щось зламати?😅`,
    `, давай ще!😅`,
    `, аби ділом не займатись!😅`,
    `, прокрастинуєш?😅`,
    `, адміна покликати?😅`,
    `, я сподіваюсь палець зісковзнув?🤨`,
    `, тобі показати звідки повідомленн беруються?😅`,
    `, я від тебе іншого і не очікував😅`,
    `, хто ж ще це міг бути😅`,
    `, хочеш на бан наклацати?😅`,
]

module.exports = {
    commands,
    githubUrl,
    inlineNoUserMessages
    // wellcomeMessage,
}

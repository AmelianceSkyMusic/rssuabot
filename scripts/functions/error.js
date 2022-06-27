// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<



// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function error(functionNmme, error, ...msgs) {
	console.log(msgs);
	const developerMsg = msgs.length > 0 ?  '\n' + msgs.join('\n') + '\n' : '\n';
	console.error(
		`\n`,
		`↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓\n`,
		`ASM ERRROR in → ${functionNmme} ←`,
		developerMsg,
		`\n`,
		error,
		`\n`
	);
}

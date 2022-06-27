// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function getRandomNumber(min=0, max=9) {
	if (min >= max) return undefined;
	const randomNumber = Math.trunc(Math.random()*(max-min+1)) + min;
	return randomNumber;
}

// wrapperCount - a parameter that sets the number of wrappers around the function to shift the error array
export function returnLog(error: unknown, appName?: string, wrapperCount = 0): string {
	const errorCount = 2 + wrapperCount;

	let message = 'Sorry, something went wrong ¯\\_(ツ)_/¯!';
	if (error) {
		if (typeof error === 'string') message = error;
		if (error instanceof Error) message = error.message;
	}
	if (appName) {
		// eslint-disable-next-line no-console
		console.log(`${appName} >`, `${message}\n`, new Error().stack?.split('\n').splice(errorCount).join('\n'));
	} else {
		// eslint-disable-next-line no-console
		console.log(`${message}\n`, new Error().stack?.split('\n').splice(errorCount).join('\n'));
	}
	return message;
}

// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default async function getCommandText(ctx) {
	try {
		return ctx.update.message.text.split('@')[0];
	} catch (error) {
		f.error('getCommandText', error);
	}
}

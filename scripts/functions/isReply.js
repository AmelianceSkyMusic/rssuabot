// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function isReply(ctx) {
	try {
		return ctx.update.message?.reply_to_message?.from ? true : false;
	} catch (error) {
		f.error('isReply', error);
	}
}

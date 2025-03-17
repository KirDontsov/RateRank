export function prepareTextDevidedByGroups(textArray: string[]) {
	let res = [];
	let inWindow = false;
	let group = [];

	for(let i = 0; i <= (textArray?.length ?? 0); i++) {
		if (!inWindow) {
			inWindow = true;
			continue;
		}

		if (inWindow && textArray?.[i]  !== '') {
			group.push(textArray?.[i]);

			if (textArray?.[i + 1]  === '') {
				res.push(group.join('\n'));
				group = [];
				inWindow = false;
			}
		}
	}
	return res;
}
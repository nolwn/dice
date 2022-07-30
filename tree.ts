let cases = 1;

export function ofAKindOdds(ofAKind: number, dice: number): number {
	const hits: number[] = [];
	for (let i = 0; i < 6; i++) {
		hits.push(0);
	}

	hits[0] = 1;


	const odds = ofAKindOddsHelper(ofAKind, dice - 1, hits);
	console.log(`considered ${cases} cases`);
	return odds;
}

function ofAKindOddsHelper(
	ofAKind: number,
	dice: number,
	hits: number[],
): number {
	cases++;
	if (patternMatch(hits, ofAKind)) return 1;
	else if (dice === 0) return 0;
	else {
		let total = 0;
		let curr = 0;
		while (curr < hits.length) {
			const newHit = [...hits];
			newHit[curr]++;
			total += (1 / 6) * ofAKindOddsHelper(ofAKind, dice - 1, newHit);
			curr++
		}

		return total;
	}
}

function patternMatch(hits: number[], ofAKind: number): boolean {
	for (const hit of hits) {
		if (hit === ofAKind) return true;
	}

	return false;
}
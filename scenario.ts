export function ofAKindOdds(ofAKind: number, dice: number) {
	const scenarios: Scenario[] = [];
	const scen = new Scenario(dice, ofAKind);
	let numerator: number;
	let demoninator: number;

	scenarios.push(scen.clone());

	while (scen.next()) {
		scenarios.push(scen.clone());
	}

	numerator = scenarios.filter(scen => scen.patternMatch()).length;
	demoninator = scenarios.length;

	scenarios.forEach(s => console.log(`${s}`));
	// console.log(`considered ${demoninator} cases`);
	console.log(`${numerator}/${demoninator}`);

	return numerator / demoninator;
}

class Scenario {
	private dice: number[];
	private ofAKind: number;

	constructor(dice: number, ofAKind: number) {
		this.ofAKind = ofAKind;
		this.dice = [];
		for (let i = 0; i < dice; i++) {
			this.dice.push(1);
		}
	}

	toString(): string {
		return `${this.patternMatch() ?
			"\u001b[32m" :
			"\u001b[31m"}${this.dice.toString()}\u001b[0m`;
	}

	clone(): Scenario {
		const clone = new Scenario(this.dice.length, this.ofAKind);
		for (let i = 0; i < this.dice.length; i++) {
			clone.set(i, this.dice[i]);
		}

		return clone;
	}

	set(pos: number, val: number) {
		this.dice[pos] = val;
	}

	get(pos: number) {
		return this.dice[pos];
	}

	next(): Scenario | null {
		let lowest = 0;

		// find the lowest index that can be incremented (is less than 6)...
		while (this.get(lowest) === 6) {
			lowest++;
		}

		if (lowest >= this.dice.length) return null;

		// ...increment it
		this.set(lowest, this.get(lowest) + 1);

		// for every index below the one that was incremented...
		lowest--;
		while (lowest >= 0) {
			this.set(lowest, 1); // ...set that index back to 1
			lowest--;
		}

		return this;
	}

	patternMatch(): boolean {
		const map: Map<number, number> = new Map();
		for (const di of this.dice) {
			map.set(di, (map.get(di) ?? 0) + 1);
			if (map.get(di)! >= this.ofAKind) return true;
		}

		return false;
	}
}

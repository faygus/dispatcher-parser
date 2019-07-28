export class Interpretation {
	args: Variable[] = [];

	constructor(
		public name: string
	) {

	}
}

export enum PrimitiveType {
	NUMBER,
	STRING,
	BOOLEAN,
	VOID
}

type TypeSymbole = string;

export type Type = PrimitiveType | TypeSymbole | { [key: string]: Type };

export class Variable {
	constructor(
		public name: string,
		public type: Type
	) {

	}
}

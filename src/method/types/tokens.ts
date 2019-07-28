import { Token, GroupOfTokens, TokenWithContext } from "code-parsing";

export class MethodNameToken extends Token {
}

export class ArgumentNameToken extends TokenWithContext<ArgumentNameCxt> {
}

export class ArgumentTypeToken extends TokenWithContext<ArgumentTypeCxt> {
}

// contexts

export class ArgumentNameCxt {
	constructor(public methodName: string) {
	}
}

export class ArgumentTypeCxt {
	constructor(public methodName: string, public argumentName: string) {

	}
}

// group of tokens inside an expression
export type Tokens = MethodNameToken | ArgumentNameToken | ArgumentTypeToken;

export class TokensList extends GroupOfTokens<Tokens> {
}

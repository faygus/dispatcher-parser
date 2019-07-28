import { GroupOfTokens, TokenWithContent } from "code-parsing";
import { TokensList as MethodTokensList } from "../../method/types/tokens";

export class MethodToken extends TokenWithContent<undefined, MethodTokensList> {
}

// group of tokens inside an expression
export type Tokens = MethodToken;

export class TokensList extends GroupOfTokens<Tokens> {
}

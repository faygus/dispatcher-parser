import { ParsingResultBuilder, ICodeParsingResult, TokenUnit } from "code-parsing";
import { DiagnosticType } from "./types/diagnostic-type";
import { Interpretation } from "./types/interpretation";
import * as Model from "./types/tokens";
import * as Method from "../method/types";

export class Register {
	private _interpretation: Interpretation;

	constructor(private _resultBuilder: ParsingResultBuilder<Model.Tokens, DiagnosticType, Interpretation>) {
		this._interpretation = new Interpretation();
		this._resultBuilder.setInterpretation(this._interpretation);
	}

	addMethod(offset: number, method: ICodeParsingResult<
		Method.Tokens, Method.DiagnosticType, Method.Interpretation>): void {
		const tokenUnit = new TokenUnit(method.text, offset);
		const content = new Method.TokensList(method.tokens);
		const token = new Model.MethodToken(tokenUnit, undefined, content);
		this._resultBuilder.addToken(token);
		this._interpretation.methods.push(method.interpretation);
	}
}

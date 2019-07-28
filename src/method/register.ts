import { ParsingResultBuilder, TokenUnit } from "code-parsing";
import { DiagnosticType } from "./types/diagnostic-type";
import { Interpretation, Variable } from "./types/interpretation";
import * as Model from "./types/tokens";

export class Register {
	private _methodName: string;
	private _argumentName: string;
	private _interpretation: Interpretation;

	constructor(private _resultBuilder: ParsingResultBuilder<Model.Tokens, DiagnosticType, Interpretation>) {

	}

	addMethodName(offset: number, name: string): void {
		const tokenUnit = new TokenUnit(name, offset);
		const token = new Model.MethodNameToken(tokenUnit);
		this._resultBuilder.addToken(token);
		this._methodName = name;
		this._interpretation = new Interpretation(name);
		this._resultBuilder.setInterpretation(this._interpretation);
	}

	addArgumentName(offset: number, name: string): void {
		this._argumentName = name;
		const tokenUnit = new TokenUnit(name, offset);
		const context = new Model.ArgumentNameCxt(this._methodName);
		const token = new Model.ArgumentNameToken(tokenUnit, context);
		this._resultBuilder.addToken(token);
		this._interpretation.args.push(new Variable(name, undefined));
	}

	addArgumentType(offset: number, name: string): void {
		const tokenUnit = new TokenUnit(name, offset);
		const context = new Model.ArgumentTypeCxt(this._methodName, this._argumentName);
		const token = new Model.ArgumentTypeToken(tokenUnit, context);
		this._resultBuilder.addToken(token);
		this._interpretation.args.slice().reverse()[0].type = name;
	}
}

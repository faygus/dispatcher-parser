import { BaseCodeParser, whiteSpaceCharacters, StringUtils } from "code-parsing";
import { Register } from "./register";
import { DiagnosticType } from "./types/diagnostic-type";
import { Interpretation } from "./types/interpretation";
import { Tokens } from "./types/tokens";

/*
Exemple de parsing :
`doAction1(arg1: number, arg2: string)`
*/
export class Parser extends BaseCodeParser<Tokens,
	DiagnosticType,
	Interpretation> {

	private _register: Register;

	constructor(data: string, endingCharacter?: string) {
		super(data, endingCharacter);
		this._register = new Register(this._resultBuilder);
	}

	protected buildResult(): void {
		this._stringParser.navigateToFirstNonEmptyChar();
		const methodNameInfos = this._stringParser.navigateUntil(['(', ...whiteSpaceCharacters]);
		this._register.addMethodName(methodNameInfos.range.start, methodNameInfos.text);
		if (methodNameInfos.stopPattern !== '(') {
			this._stringParser.navigateUntil('(');
		}
		this._stringParser.navigateToFirstNonEmptyChar();
		this.nextOperation(this.parseArgumentName);
	}

	private parseArgumentName(): void {
		const infos = this._stringParser.navigateUntil([':', ',', ')', ...whiteSpaceCharacters]);
		this._register.addArgumentName(infos.range.start, infos.text);
		let stop = infos.stopPattern;
		if (StringUtils.charIsEmpty(stop)) {
			stop = this._stringParser.navigateToFirstNonEmptyChar().currentChar;
			this._stringParser.next();
		}
		switch (stop) {
			case ',':
				// no type defined -> diagnostic
				this._stringParser.navigateToFirstNonEmptyChar();
				return this.nextOperation(this.parseArgumentName);
			case ':':
				this._stringParser.navigateToFirstNonEmptyChar();
				return this.nextOperation(this.parseArgumentType);
			case ')':
				// no type defined -> diagnostic
				return;
		}
	}

	private parseArgumentType(): void {
		const infos = this._stringParser.navigateUntil([')', ',', ...whiteSpaceCharacters]);
		this._register.addArgumentType(infos.range.start, infos.text);
		let stop = infos.stopPattern;
		if (StringUtils.charIsEmpty(stop)) {
			stop = this._stringParser.navigateToFirstNonEmptyChar().currentChar;
			this._stringParser.next();
		}
		switch (stop) {
			case ')':
				return;
			case ',':
				this._stringParser.navigateToFirstNonEmptyChar();
				return this.nextOperation(this.parseArgumentName);
		}
	}
}

import { BaseCodeParser, whiteSpaceCharacters, StringUtils } from "code-parsing";
import { Register } from "./register";
import { DiagnosticType } from "./types/diagnostic-type";
import { Interpretation } from "./types/interpretation";
import { Tokens } from "./types/tokens";
import { Parser as MethodParser } from "../method/parser";

/*
Exemple de parsing :
doAction1(arg1: number, arg2: string)
doAction2(arg1: boolean, arg2: boolean)
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
		this.parseMethod();
	}

	private parseMethod(): void {
		this._stringParser.navigateToFirstNonEmptyChar();
		const jsonParser = new MethodParser(this._stringParser.nextString, '\n');
		const parsingResult = jsonParser.parse();
		this._register.addMethod(this._stringParser.offset, parsingResult);
		this._stringParser.next(jsonParser.offset);
		this.nextOperation(this.parseMethod);
	}
}

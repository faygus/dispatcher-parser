import { Parser } from "../src/method/parser";

describe('method parsing', () => {
	test('parse data', () => {
		const data = `doAction1(arg1: number, arg2: string)`;
		const parser = new Parser(data);
		const res = parser.parse();
		expect(res.interpretation.name).toEqual('doAction1');
	});
});


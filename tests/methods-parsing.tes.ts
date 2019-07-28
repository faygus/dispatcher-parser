import { Parser } from "../src/methods/parser";

describe('method parsing', () => {
	test('parse data', () => {
		const data = `doAction1(arg1: number, arg2: string)




doAction2(arg1: boolean, arg2: boolean)`;
		const parser = new Parser(data);
		const res = parser.parse();
		expect(res.interpretation.methods.length).toEqual(2);
	});
});


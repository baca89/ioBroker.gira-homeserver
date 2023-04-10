"use strict";

/**
 * This is a dummy TypeScript test file using chai and mocha
 *
 * It's automatically excluded from npm and its build output is excluded from both git and npm.
 * It is advised to test all your modules with accompanying *.test.js-files
 */

// tslint:disable:no-unused-expression

const { should } = require("chai").should;
const { getTypeOfGiraDatapoint } = require("../lib/homeserverTypes.js").getTypeOfGiraDatapoint;

describe("homeserverTypes => getTypeOfGiraDatapoint", () => {

	it(`should return "Boolean on ID 1"`, () => {
		const result = getTypeOfGiraDatapoint(1);
		result.should.be.equal("Boolean");
	});
	// ... more tests => it
});

// ... more test suites => describe
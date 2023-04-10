/* eslint-disable no-unused-vars */

"use strict";

const { should } = require("chai").should;
const { expect } = require("chai");
const { getTypeOfGiraDatapoint } = require("../lib/homeserverTypes.js");

describe("homeserverTypes => getTypeOfGiraDatapoint", () => {

	it(`should return "boolean on ID 1`, () => {
		const result = getTypeOfGiraDatapoint(1);
		result.should.be.equal("boolean");
	});
	it(`Should return a String on ID 1`,() => {
		const result = getTypeOfGiraDatapoint(1);
		result.should.be.a("string");
	});
	it(`Should return a number on ID 2`,() => {
		const result = getTypeOfGiraDatapoint(2);
		result.should.be.equal("number");
	});
	it(`Should return a String on ID 2`,() => {
		const result = getTypeOfGiraDatapoint(2);
		result.should.be.a("string");
	});
	it(`Should return a number on ID 4`,() => {
		const result = getTypeOfGiraDatapoint(4);
		result.should.be.equal("number");
	});
	it(`Should return a String on ID 4`,() => {
		const result = getTypeOfGiraDatapoint(4);
		result.should.be.a("string");
	});
	it(`Should return a number on ID 9`,() => {
		const result = getTypeOfGiraDatapoint(9);
		result.should.be.equal("number");
	});
	it(`Should return a String on ID 9`,() => {
		const result = getTypeOfGiraDatapoint(9);
		result.should.be.a("string");
	});
	it(`Should return a number on ID 11`,() => {
		const result = getTypeOfGiraDatapoint(11);
		result.should.be.equal("number");
	});
	it(`Should return a String on ID 11`,() => {
		const result = getTypeOfGiraDatapoint(11);
		result.should.be.a("string");
	});
	it(`Should return a number on ID 12`,() => {
		const result = getTypeOfGiraDatapoint(12);
		result.should.be.equal("number");
	});
	it(`Should return a String on ID 12`,() => {
		const result = getTypeOfGiraDatapoint(12);
		result.should.be.a("string");
	});
	it(`Should return a number on ID 13`,() => {
		const result = getTypeOfGiraDatapoint(13);
		result.should.be.equal("number");
	});
	it(`Should return a String on ID 13`,() => {
		const result = getTypeOfGiraDatapoint(13);
		result.should.be.a("string");
	});
	it(`Should return a number on ID 14`,() => {
		const result = getTypeOfGiraDatapoint(14);
		result.should.be.equal("number");
	});
	it(`Should return a String on ID 14`,() => {
		const result = getTypeOfGiraDatapoint(14);
		result.should.be.a("string");
	});
	it(`Should return a number on ID 15`,() => {
		const result = getTypeOfGiraDatapoint(15);
		result.should.be.equal("number");
	});
	it(`Should return a String on ID 15`,() => {
		const result = getTypeOfGiraDatapoint(15);
		result.should.be.a("string");
	});
	it(`Should return text String on ID 22`,() => {
		const result = getTypeOfGiraDatapoint(22);
		result.should.be.equal("string");
	});
	it(`Should return a String on ID 22`,() => {
		const result = getTypeOfGiraDatapoint(22);
		result.should.be.a("string");
	});
	it(`Should return text Mixed on other ID`,() => {
		const result = getTypeOfGiraDatapoint(3);
		result.should.be.equal("Mixed");
	});
	it(`Should return a String on other ID`,() => {
		const result = getTypeOfGiraDatapoint(3);
		result.should.be.a("string");
	});
	it(`Should thrown an error on no parameter`,() => {
		expect(getTypeOfGiraDatapoint).to.throw("no param");
	});
	it(`Should thrown an error on string-parameter`,() => {
		expect(() => {getTypeOfGiraDatapoint("1");}).to.throw("parameter have to be of type number");
	});
});

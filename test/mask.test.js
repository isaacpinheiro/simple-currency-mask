"use strict";

const { mask, unmask, dynamicMask } = require("../src/index");

test("01 - Testing mask function without the config object.", () => {
  expect(mask("1234567.89")).toBe("1,234,567.89");
  expect(mask("-1234567.89")).toBe("-1,234,567.89");
});

test("02 - Testing unmask function without the config object.", () => {
  expect(unmask("1,234,567.89")).toBe("1234567.89");
  expect(unmask("-1,234,567.89")).toBe("-1234567.89");
});

test("03 - Testing dynamicMask function without the config object.", () => {
  expect(dynamicMask("1234567.89")).toBe("1,234,567.89");
  expect(dynamicMask("-1234567.89")).toBe("-1,234,567.89");
});

test("04 - Testing mask function with the config object.", () => {

  let config = { decimalSeparator: ",", currency: "R$" };

  expect(mask("1234567.89", config)).toBe("R$ 1.234.567,89");
  expect(mask("-1234567.89", config)).toBe("R$ -1.234.567,89");

});

test("05 - Testing mask function without the currency attribute.", () => {

  let config = { decimalSeparator: "," };

  expect(mask("1234567.89", config)).toBe("1.234.567,89");
  expect(mask("-1234567.89", config)).toBe("-1.234.567,89");

});

test("06 - Testing mask function without the decimalSeparator attribute.", () => {

  let config = { currency: "R$" };

  expect(mask("1234567.89", config)).toBe("R$ 1,234,567.89");
  expect(mask("-1234567.89", config)).toBe("R$ -1,234,567.89");

});

test("07 - Testing mask function without the decimalSeparator = '.'.", () => {

  let config = { decimalSeparator: "." };

  expect(mask("1234567.89", config)).toBe("1,234,567.89");
  expect(mask("-1234567.89", config)).toBe("-1,234,567.89");

});

test("08 - Testing unmask function with the config object.", () => {

  let config = { decimalSeparator: ",", currency: "R$" };

  expect(unmask("R$ 1.234.567,89", config)).toBe("1234567.89");
  expect(unmask("R$ -1.234.567,89", config)).toBe("-1234567.89");

});

test("09 - Testing unmask function without the currency attribute.", () => {

  let config = { decimalSeparator: "," };

  expect(unmask("1.234.567,89", config)).toBe("1234567.89");
  expect(unmask("-1.234.567,89", config)).toBe("-1234567.89");

});

test("10 - Testing unmask function without the decimalSeparator attribute.", () => {

  let config = { currency: "R$" };

  expect(unmask("R$ 1,234,567.89", config)).toBe("1234567.89");
  expect(unmask("R$ -1,234,567.89", config)).toBe("-1234567.89");

});

test("11 - Testing unmask function with the decimalSeparator = '.'.", () => {

  let config = { decimalSeparator: "." };

  expect(unmask("1,234,567.89", config)).toBe("1234567.89");
  expect(unmask("-1,234,567.89", config)).toBe("-1234567.89");

});

// dynamicMask tests
// TODO

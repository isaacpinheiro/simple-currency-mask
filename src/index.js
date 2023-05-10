"use strict";

function mask(strVal, config = null) {

  let res = ""; 
  let vec = strVal.split(".");
  let c = 0;
  let decimalSeparator = ".";
  let separator = ",";
  let currency = "";

  if (config !== null) {

    if (config.decimalSeparator !== undefined && config.decimalSeparator !== null
      && config.decimalSeparator === ",") {

      decimalSeparator = config.decimalSeparator;
      separator = ".";

    }

    if (config.currency !== undefined && config.currency !== null) {
      currency = config.currency;
    }

  }

  for (let i = vec[0].length - 1; i >= 0; i--) {

    if (c !== 0 && c % 3 === 0 && vec[0][i] !== "-") {
      res = vec[0][i] + separator + res;
    } else {
      res = vec[0][i] + res;
    }   

    c++;

  }

  if (vec[1] !== undefined) res = res + decimalSeparator + vec[1];
  else res = res + decimalSeparator + "00";

  if (currency !== "") res = currency + " " + res;

  return res;

}

function unmask(strVal, config = null) {
  return "";
}

function dynamicMask(strVal, config = null) {
  return "";
}

module.exports = {
  mask: mask,
  unmask: unmask,
  dynamicMask: dynamicMask
};

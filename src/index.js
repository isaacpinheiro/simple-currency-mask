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

  let res = ""; 
  let vec = null;
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
      currency = config.currency + " ";
    }

  }

  if (currency !== "") {
    strVal = strVal.split(currency)[1];
  }

  vec = strVal.split(decimalSeparator);

  for (let i = 0; i < vec[0].length; i++) {

    if (vec[0][i] !== separator) {
      res = res + vec[0][i];
    }   

  }

  res = res + "." + vec[1];
  return res;

}

function dynamicMask(strVal, config = null) {

  let decimalSeparator = ".";
  let separator = ",";
  let currency = "";
  let negative = true;
  let sval = "";
  let re = null;
  let isNeg = false;

  if (config !== null) {

    if (config.decimalSeparator !== undefined && config.decimalSeparator !== null
      && config.decimalSeparator === ",") {

      decimalSeparator = config.decimalSeparator;
      separator = ".";

    }

    if (config.currency !== undefined && config.currency !== null) {
      currency = config.currency;
    }

    if (config.negative !== undefined && config.negative !== null) {
      negative = config.negative;
    }

  }

  if (negative) re = /^(-|[0-9])$/i;
  else re = /^[0-9]$/i;

  let cond = (strVal !== "-0.0" && strVal !== "-0,0");

  if (currency !== "") {
    cond = (strVal !== (currency + " -0.0") && strVal !== (currency + " -0,0"));
  }

  if (cond) {

    for (let i = 0; i < strVal.length; i++) {

      if (re.test(strVal[i])) {

        if (strVal[i] === "-") isNeg = true;
        else sval = sval + strVal[i];

      }

    }

  }

  sval = parseInt(sval);
  sval = sval.toString();
  let res = "";

  if (sval === "NaN") {

    if (decimalSeparator === ".") res = "0.00";
    else res = "0,00";

  } else if (sval.length === 1) {

    if (decimalSeparator === ".") res = "0.0" + sval;
    else res = "0,0" + sval;

  } else if (sval.length === 2) {

    if (decimalSeparator === ".") res = "0." + sval;
    else res = "0," + sval;

  } else {

    let i = sval.length - 1;
    let c = 0;

    res = sval[i] + res;
    i--;

    res = sval[i] + res;
    i--;

    res = decimalSeparator + res;

    for (; i >= 0; i--) {

      if (c !== 0 && c % 3 === 0) {

        res = sval[i] + separator + res;

      } else {
        res = sval[i] + res;
      }

      c++;

    }

  }

  if (isNeg) {
    res = "-" + res;
  }

  if (currency !== "") res = currency + " " + res;

  return res;

}

module.exports = {
  mask: mask,
  unmask: unmask,
  dynamicMask: dynamicMask
};

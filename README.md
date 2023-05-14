# simple-currency-mask
**Description**

A simple currency mask for React. It was designed to work with any currency (USD, EUR, BRL, ...).

**Installation**

```
npm install simple-currency-mask --save
```

**Example 1 - dynamicMask function:**

The `dynamicMask` function was designed to work in `<input type="text" />` formulary.

```js
import { useState } from 'react';
import { dynamicMask } from 'simple-currency-mask';

function App() {

  const [monetaryValue, setMonetaryValue] = useState('0.00');

  function changeMonetaryValue(e) {
    setMonetaryValue(dynamicMask(e.target.value));
  }

  return (
    <div>
      <input type="text" value={monetaryValue} onChange={changeMonetaryValue} />
    </div>
  );  

}

export default App;
```

**Example 2 - dynamicMask function and config object configured for BRL currency:**

```js
import { useState } from 'react';
import { dynamicMask } from 'simple-currency-mask';

function App() {

  const [monetaryValue, setMonetaryValue] = useState('R$ 0.00');

  function changeMonetaryValue(e) {
  
    let config = { decimalSeparator: ",", currency: "R$", negative: true };
  
    setMonetaryValue(dynamicMask(e.target.value, config));
    
  }

  return (
    <div>
      <input type="text" value={monetaryValue} onChange={changeMonetaryValue} />
    </div>
  );  

}

export default App;
```

**Example 3 - mask and unmask functions:**

The `mask` function is not designed to work in `<input type="text" />` formulary. The `unmask` function unmasks the values masked by `mask` and `dynamicMask` functions with the same `config`.

The result of `unmask` function can be converted to JavaScript `number` type.

Example: `parseFloat(unmask("1,234.56")); // Result: 1234.56`.

```js
import { mask, unmask } from 'simple-currency-mask';

function App() {

  return (
    <div>
      <p><b>Mask:</b> {mask("-1234567.89")}</p>
      <p><b>Unmask:</b> {unmask("-1,234,567.89")}</p>
    </div>
  );  

}

export default App;
```

**Example 4 - mask and unmask functions and config object configured for BRL currency :**

```js
import { mask, unmask } from 'simple-currency-mask';

function App() {

  return (
    <div>
      <p><b>Mask:</b> {mask("-1234567.89", { decimalSeparator: ",", currency: "R$" })}</p>
      <p><b>Unmask:</b> {unmask("R$ -1.234.567,89", { decimalSeparator: ",", currency: "R$" })}</p>
    </div>
  );  

}

export default App;
```

**Config Object**

The `config` object is an optional parameter to the `mask`, `unmask` and `dynamicMask` functions. It has three attributes: `decimalSeparator`, `currency` and `negative`.

The `decimalSeparator` attribute indicates if the decimal value are separated by `.` or `,`. The default value is `.`.

The `currency` attribute indicates the currency symbol. It is blank by default.

The `negative` attribute works exclusively with the `dynamicMask` function and indicates if the `<input type="text" />` formulary works with negative values. The default value is `true`.

When `decimalSeparator` value is `.`, `1000000.00` is masked to `1,000,000.00`. When `decimalSeparator`
 value is `,`, `1000000.00` is masked to `1.000.000,00`.
 

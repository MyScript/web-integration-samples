# wolfram-alpha-api

Copyright (c) 2018, Wolfram Alpha LLC. Licensed under a [Creative Commons
Attribution-NonCommercial 4.0 International License][CC-BY-NC-4.0].

## Wolfram|Alpha APIs NPM Library

This is a class that allows Node.js applications/backends to simply call 
(some of) the [Wolfram|Alpha APIs][api].

Before you can use any of the APIs described below, you will need an 'AppID'
from the [Wolfram|Alpha Developer Portal][dp].
(Note, because AppIDs may not be distributed, this library is not intended for
use in the frontend.)

First, import the class, and instantiate it with your 'AppID':

```js
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('DEMO-APPID');
```

Then, call one of the following 'get' methods
with either a string of a query or an object of parameters,
and it will return a Promise that will resolve the result or reject an Error.

## getFull(input)

If 'input' is a string, it will call the [Wolfram|Alpha Full Results API][fr],
and will return a Promise. This Promise will either resolve with an Object of
results, or will reject with an Error.

```js
waApi.getFull('sin x').then(console.log).catch(console.error);
// { success: true, error: false, numpods: 13, datatypes: '', ...

waApi.getFull('F9TVlu5AmVzL').then(console.log).catch(console.error);
// { success: false, error: false, numpods: 0, datatypes: '', ...

waApi.getFull('sin(x)').then((queryresult) => {
  const pods = queryresult.pods;
  const output = pods.map((pod) => {
    const subpodContent = pod.subpods.map(subpod =>
      `  <img src="${subpod.img.src}" alt="${subpod.img.alt}">`
    ).join('\n');
    return `<h2>${pod.title}</h2>\n${subpodContent}`;
  }).join('\n');
  console.log(output);
}).catch(console.error);
// <h2>Input</h2>
//   <img src="http://www1.wolframalpha.com/Calculate/MSP/MSP2831bhah3hgdb1d0a6h0000270i2f8f935cf432?MSPStoreType=image/gif&s=14" alt="sin(x)">
// <h2>Plots</h2>
//   <img src="http://www1.wolframalpha.com/Calculate/MSP/MSP2841bhah3hgdb1d0a6h000018c0hieb8d6cc753?MSPStoreType=image/gif&s=14" alt="">
//   <img src="http://www1.wolframalpha.com/Calculate/MSP/MSP2851bhah3hgdb1d0a6h00005ge64a5i3g8g8i6f?MSPStoreType=image/gif&s=14" alt="">
// ...
```

'input' may also be an Object of parameters. (For more information, see the
[Wolfram|Alpha Full Results API Documentation - Parameter Reference][fr-pr])

```js
waApi.getFull({
  input: 'pikachu',
  includepodid: 'Statistics:PokemonData',
  format: 'plaintext',
}).then((queryresult) => {
  console.log(queryresult.pods[0].subpods[0].plaintext)
}).catch(console.error)
// hit points | 35
// attack | 55
// defense | 40
// ...
```

Note: We are defaulting the 'output' parameter to `'json'`. If you set output
to `'xml'`, we will resolve a string of XML.

```js
waApi.getFull({
  input: 'weather in miami',
  output: 'xml',
}).then(console.log).catch(console.error)
// "<?xml version='1.0' encoding='UTF-8'?>
// <queryresult success='true'
//     error='false'
//     numpods='0'
// ..."
```

## getSimple(input)

If 'input' is a string, it will call the [Wolfram|Alpha Simple API][s],
and will return a Promise. This Promise will either resolve with a Data URI,
or will reject with an Error.

```js
waApi.get('where is the ISS?').then(console.log).catch(console.error);
// "data:image/gif;base64,R0lGODlhHAJlA/cAAAAAAAAEAAgICAsNCxwdHBAUECkqKTk8O..."

waApi.getSimple('F9TVlu5AmVzL').then(console.log).catch(console.error);
// Error: Wolfram|Alpha did not understand your input

waApi.getSimple('time until christmas').then((url) => {
  console.log(`<img src="${url}">`)
}).catch(console.error);
// "<img src="data:image/gif;base64,R0lGODlhHAKLAvcAAAAAAAAEAAgICAgMCBAQEBA..."
```

'input' may also be an Object of parameters. (For more information, see the
[Wolfram|Alpha Simple API Documentation][s])

```js
waApi.getSimple({
  i: 'What planes are flying overhead?',
  width: 320,
  background: '224466',
  foreground: 'white',
}).then(console.log).catch(console.error);
// "data:image/gif;base64,R0lGODlhQAFvBPcAADI+WSZAYloyRyBEWiBIWhpGWRhIS..."
```

## getShort(input)

If 'input' is a string, it will call the [Wolfram|Alpha Short Answers API][sa],
and will return a Promise. This Promise will either resolve with a string,
or will reject with an Error.

```js
waApi.getShort("16th president of us").then(console.log).catch(console.error);
// Abraham Lincoln (from March 4, 1861 to April 15, 1865)

aApi.getShort('F9TVlu5AmVzL').then(console.log).catch(console.error);
// Error: Wolfram|Alpha did not understand your input

const formatAnswer = answer => `<strong class="answer">${answer}</strong>`;
waApi.getShort('20! seconds in years').then((data) => {
  console.log(formatAnswer(data));
}).catch(console.error);
// <strong class="answer">77.1 billion years</strong>
```

'input' may also be an Object of parameters. (For more information, see the
[Wolfram|Alpha Short Answers API Documentation][sa])

```js
waApi.getShort({
  i: 'distance between new york and london',
  units: 'metric',
}).then(console.log).catch(console.error);
// "5585 kilometers"
```

## getSpoken(input)

If 'input' is a string, it will call the [Wolfram|Alpha Spoken Results API][sr],
and will return a Promise. This Promise will either resolve with a string,
or will reject with an Error.

```js
waApi.getSpoken("when is labor day in 2020")
  .then(console.log).catch(console.error);
// "The answer is Monday, September 7, 2020"

waApi.getSpoken('F9TVlu5AmVzL').then(console.log).catch(console.error);
// Error: Wolfram Alpha did not understand your input

const formatAnswer = answer => `<strong class="answer">${answer}</strong>`;
waApi.getSpoken('how far away is mars?').then((data) => {
  console.log(formatAnswer(data));
}).catch(console.error);
// <strong class="answer">The answer is about 2.16 astronomical units</strong>
```

'input' may also be an Object of parameters. (For more information, see the
[Wolfram|Alpha Spoken Results API Documentation][sr])

```js
waApi.getSpoken({
  i: 'how tall is the tallest building in chicago',
  units: 'metric',
}).then(console.log).catch(console.error);
// "The answer is about 442 meters"
```

[CC-BY-NC-4.0]: https://creativecommons.org/licenses/by-nc/4.0/
[api]: https://products.wolframalpha.com/api/
[dp]: https://developer.wolframalpha.com/portal/myapps/
[fr]: https://products.wolframalpha.com/api/documentation/
[fr-pr]: https://products.wolframalpha.com/api/documentation/#parameter-reference
[s]: https://products.wolframalpha.com/simple-api/documentation/ 
[sa]: https://products.wolframalpha.com/short-answers-api/documentation/
[sr]: https://products.wolframalpha.com/spoken-results-api/documentation/

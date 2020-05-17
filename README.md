# linesman

The functions which show the filename and line numbers if the assertion fails, and then continue.

## Installation

Locally install to your project:

```shell script
npm install linesman
```

Or globally install it:

```shell script
npm install -g linesman
```

## Usage

For a demo project with more detail, please check [linesman-demo](https://github.com/afbytes/linesman-demo). 

### Demo 1

Use positive logic by default:

```javascript
const {ok, no, le, se, de} = require('linesman');

ok(true);
no(false);
ok(false); // LINE 5 - **assertion failed**

le(12, 12); // Loosely Equal
le(12, '12');
se(12, 10 + 2); // Strictly Equal
se(12, '12'); // LINE 10 - **assertion failed** : not `strictly equal`

se('5' + 3, '53'); // '5' is converted to string by JS.
se('5' - 3, 2); // '5' is converted to number by JS.

// Deeply Equal
de({age: 21}, {age: 20 + 1});
```

Result:

```
$ node demo-1.js
Assertion failed at: demo-1.js:5.
   Expected  : (boolean) true
   Provided  : (boolean) false
Assertion failed at: demo-1.js:10.
   Evaluated : (number) 12
   Provided  : (string) "12"
```

### Demo 2

Use `yes` (positive logic) and `not`(negative logic):

```javascript
const {yes, not} = require('linesman');

yes.ok(true);
yes.no(false);
yes.ok(false); // LINE 5 - **assertion failed**
not.ok(false);

yes.le(12, '12'); // Loosely Equal
yes.le(12, 12);
yes.se(12, 10 + 2); // Strictly Equal
yes.se(12, '12'); // LINE 11 - **assertion failed**: not `strictly equal`

yes.se('5' + 3, '53'); // '5' is converted to string by JS.
yes.se('5' - 3, 2); // '5' is converted to number by JS.

// Deeply Equal
yes.de({age: 21}, {age: 20 + 1});
```

Result:

```
$ node demo-2.js
Assertion failed at: demo-2.js:5.
   Expected  : (boolean) true
   Provided  : (boolean) false
Assertion failed at: demo-2.js:11.
   Evaluated : (number) 12
   Provided  : (string) "12"
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

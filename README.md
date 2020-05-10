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

### Demo 1

Use positive logic by default:

```javascript
const {ok, no, le, se, de} = require('linesman');

ok(true);
no(false);
ok(false); // line 5 - **assertion failed**

le(12, 12); // Loosely Equal
le(12, '12');
se(12, 10 + 2); // Strictly Equal
se(12, '12'); // line 9 - **assertion failed** : not `strictly equal`

se('5' + 3, '53'); // '5' is converted to string by JS.
se('5' - 3, 2); // '5' is converted to number by JS.

// Deeply Equal
de({age: 21}, {age: 20 + 1});
```

Result:

```
$ node demo-one.js
Assertion failed at: demo-one.js:5
Assertion failed at: demo-one.js:10
```

### Demo 2

Use `yes` (positive logic) and `not`(negative logic):

```javascript
const {yes, not} = require('linesman');

yes.ok(true);
yes.no(false);
yes.ok(false); // line 5 - **assertion failed**
not.ok(false);

yes.le(12, '12'); // Loosely Equal
yes.le(12, 12);
yes.se(12, 10 + 2); // Strictly Equal
yes.se(12, '12'); // line 11 - **assertion failed**: not `strictly equal`

yes.se('5' + 3, '53'); // '5' is converted to string by JS.
yes.se('5' - 3, 2); // '5' is converted to number by JS.

// Deeply Equal
yes.de({age: 21}, {age: 20 + 1});
```

Result:

```
$ node demo-two.js
Assertion failed at: demo-two.js:5
Assertion failed at: demo-two.js:11
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

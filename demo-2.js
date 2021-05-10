const {yes, not} = require('./index');

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
yes.de({age: 21, extra: {x: 3, y: 4}}, {age: 20 + 1, extra: {y: 4, x: 3}});

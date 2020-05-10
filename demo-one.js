const {ok, no, le, se, de} = require('./index');

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

'use strict';

const os = require('os');
const DIFF_TIP = '**Note**: they should be DIFFERENT.';

let log = console.log;
let errorCount = 0;

function showErrorTip(evaluated, provided, option = {
  tip: '',
  isEvaluated: true,
}) {
  let loc = 'Unknown location';
  let error;

  try {
    // noinspection ExceptionCaughtLocallyJS
    throw new Error('Intended error.');
  } catch (e) {
    error = e;
  }

  if (error.stack) {
    const parts = error.stack.split(os.EOL);
    // 0: error-message, 1: loc-thrown, 2: calling to this func
    let s = parts[3];
    let idx = s.lastIndexOf('/');
    if (idx !== -1) {
      s = s.substring(idx + 1);
      s = s.replace(')', '');
    }
    idx = s.lastIndexOf(':');
    if (idx !== -1) {
      s = s.substring(0, idx);
    }

    loc = s;
  }

  const tip = option.tip ? ' -- ' + option.tip : '';
  const title_ = option.isEvaluated ? 'Evaluated' : 'Expected '; // with the same length
  let out1 = evaluated;
  let out2 = provided;

  const lines = [];
  lines.push(`Assertion failed at: ${loc}.${tip}`);
  lines.push(`   ${title_} : (${typeof out1}) ${_formatValue(out1)}`);
  lines.push(`   Provided  : (${typeof out2}) ${_formatValue(out2)}`);
  log(lines.join(os.EOL));
  ++errorCount;
}

function _formatValue(value) {
  const type = typeof value;
  if (type === 'object') {
    return JSON.stringify(value);
  } else if (type === 'string') {
    return `"${value}"`;
  } else {
    return value;
  }
}

function clearErrorCount() {
  errorCount = 0;
}

function getErrorCount() {
  return errorCount;
}

function ok(value) {
  if (!value) {
    showErrorTip(true, !!value, {isEvaluated: false});
  }
}

// it should be false
function not_ok(value) {
  if (value) {
    showErrorTip(false, !!value, {isEvaluated: false});
  }
}

// it should be false
function no(value) {
  if (value) {
    showErrorTip(false, !!value, {isEvaluated: false});
  }
}

/**
 * Loosely Equal.
 * @param a
 * @param b
 */
function le(a, b) {
  // noinspection EqualityComparisonWithCoercionJS
  if (a != b) {
    showErrorTip(a, b);
  }
}

/**
 * Not Loosely Equal.
 * @param a
 * @param b
 */
function not_le(a, b) {
  // noinspection EqualityComparisonWithCoercionJS
  if (a == b) {
    showErrorTip(a, b, {tip: DIFF_TIP});
  }
}

/**
 * Strictly Equal.
 * @param a
 * @param b
 */
function se(a, b) {
  if (a !== b) {
    showErrorTip(a, b);
  }
}

/**
 * Not Strictly Equal.
 * @param a
 * @param b
 */
function not_se(a, b) {
  if (a === b) {
    showErrorTip(a, b, {tip: DIFF_TIP});
  }
}

/**
 * Deeply Equal.
 * @param {object} a
 * @param {object} b
 */
function de(a, b) {
  const a2 = JSON.stringify(a);
  const b2 = JSON.stringify(b);

  if (a2 !== b2) {
    showErrorTip(a, b);
  }
}

/**
 * Not Deeply equal.
 * @param {object} a
 * @param {object} b
 */
function not_de(a, b) {
  const a2 = JSON.stringify(a);
  const b2 = JSON.stringify(b);

  if (a2 === b2) {
    showErrorTip(a, b, {tip: DIFF_TIP});
  }
}

/**
 * Positive logic.
 */
const yes = {
  ok,
  no,
  le,
  se,
  de,
};

/**
 * Negative logic.
 */
const not = {
  ok: not_ok,
  le: not_le,
  se: not_se,
  de: not_de,
};

const manager = {
  clearErrorCount,
  getErrorCount,
};

module.exports = {
  // functions
  ok,
  no,
  le,
  se,
  de,

  // objects
  yes,
  not,
  manager,
};

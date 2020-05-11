'use strict';

const os = require('os');
const DIFF_TIP = 'Note: they should be different.';

let log = console.log;
let errorCount = 0;

function showErrorTip(evaluated, provided, tip = '') {
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

  const lines = [];
  lines.push(`Assertion failed at: ${loc}.${tip ? ' -- ' + tip : ''}`);
  lines.push(`   Evaluated : (${typeof evaluated}) ${_formatValue(evaluated)}`);
  lines.push(`   Provided  : (${typeof provided}) ${_formatValue(provided)}`);
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
    showErrorTip(true, !!value);
  }
}

function not_ok(value) {
  if (!value) {
    showErrorTip(true, !value, DIFF_TIP);
  }
}

function no(value) {
  if (value) {
    showErrorTip(false, !!value);
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
    showErrorTip(a, b, DIFF_TIP);
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
    showErrorTip(a, b, DIFF_TIP);
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
    showErrorTip(a, b, DIFF_TIP);
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

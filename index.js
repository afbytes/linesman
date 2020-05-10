'use strict';

let log = console.log;

let errorCount = 0;

function showErrorTip() {
  let loc = 'Unknown location';
  let error;

  try {
    // noinspection ExceptionCaughtLocallyJS
    throw new Error('Intended error.');
  } catch (e) {
    error = e;
  }

  if (error.stack) {
    const parts = error.stack.split('\n');
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

  log('Assertion failed at: ' + loc);
  ++errorCount;
}

function clearErrorCount() {
  errorCount = 0;
}

function getErrorCount() {
  return errorCount;
}

function ok(value) {
  if (!value) {
    showErrorTip();
  }
}

function no(value) {
  if (value) {
    showErrorTip();
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
    showErrorTip();
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
    showErrorTip();
  }
}

/**
 * Strictly Equal.
 * @param a
 * @param b
 */
function se(a, b) {
  if (a !== b) {
    showErrorTip();
  }
}

/**
 * Not Strictly Equal.
 * @param a
 * @param b
 */
function not_se(a, b) {
  if (a === b) {
    showErrorTip();
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
    showErrorTip();
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
    showErrorTip();
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
  ok: no,
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

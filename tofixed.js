var toFixed = function toFixed(num, precision) {
  var numString = String(num);
  var position = numString.indexOf('.');
  var inputDigits = numString.length - position - 1;
  var shiftedNumString = '';
  var shiftedPosition;
  var roundedNumber;
  if (position === -1) { inputDigits = 0; }

  // if no rounding needed, use native toFixed;
  if (inputDigits <= precision) {
    return num.toFixed(precision);
  }
  // else - move decimal point to the right by precision places
  numString = numString.replace('.', '');
  shiftedPosition = position + precision;
  shiftedNumString = numString.substring(0, shiftedPosition) + '.' +
    numString.substring(shiftedPosition, numString.length);
  // round, divide and return
  roundedNumber = Math.round(Number(shiftedNumString));
  return (roundedNumber / (Math.pow(10, precision))).toFixed(precision);
};

tests({
  'It should return a string': function () {
    var result = toFixed(1, 1);
    eq(typeof result, 'string');
  },
  'It should always round 5 up': function () {
    eq(toFixed(0.615, 2), '0.62');
    eq(toFixed(10.235, 2), '10.24');
    eq(toFixed(1.005, 2), '1.01');
  },
  'It should work with negative numbers': function () {
    eq(toFixed(-0.13, 1), '-0.1');
  },
  'It should work if the length of the base increases due to rounding': function () {
    eq(toFixed(9.99, 1), '10.0');
  },
  'It should work if the precision exceeds the given input': function () {
    eq(toFixed(9.9, 2), '9.90');
  }
});

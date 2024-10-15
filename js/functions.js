const stringLength = function(inputPhrase, maximumLength) {
  if (inputPhrase.length <= maximumLength) {
    return true;
  } else {
    return false;
  }
};

const palindrome = function(inputPhrase) {
  let string = inputPhrase.replaceAll(' ', '');
  string = string.toUpperCase();
  let newPhrase = '';
  for (let i = string.length - 1; i >= 0; i--) {
    newPhrase += string[i];
  }
  return newPhrase === string;
};

function name(input) {

  const str = input.toString();
  let result = '';

  for (let char of str) {

    if (!Number.isNaN(parseInt(char))) {
        result += char;
      }
    }

    return result ? parseInt(result) : NaN;
}

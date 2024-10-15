function checkStringLength(str, maxLenath) {
  return str.length <= maxLenath;
}

function isPalindrome(str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  let reversedStr = '';

  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    reversedStr += normalizedStr[i];
  }

  return normalizedStr === reversedStr;
}

checkStringLength('проверяемая строка', 20);

checkStringLength('проверяемая строка', 18);

checkStringLength('проверяемая строка', 10);


isPalindrome('топот');

isPalindrome('ДовОд');

isPalindrome('Кекс');



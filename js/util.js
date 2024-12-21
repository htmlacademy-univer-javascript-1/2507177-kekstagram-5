const getRandomInteger = (a, b) =>
  Math.floor(Math.random() * (Math.abs(b - a) + 1)) + Math.min(a, b); // Убрана фигурная скобка

const getRandomElementsArray = (array, count) => {
  const randomIndexList = [];
  const max = Math.min(count, array.length);
  while (randomIndexList.length < max) {
    const index = getRandomInteger(0, array.length - 1);
    if (!randomIndexList.includes(index)) {
      randomIndexList.push(index);
    }
  }
  return randomIndexList.map((index) => array[index]); // Лишняя фигурная скобка убрана
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getUniqueNumber = (list, usedNumbers) => {
  const uniqueNumber = list.find((number) => !usedNumbers.includes(number)); // Добавлены скобки
  if (uniqueNumber !== undefined) {
    usedNumbers.push(uniqueNumber);
  }
  return uniqueNumber;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomInteger,
  getUniqueNumber,
  getRandomElementsArray,
  isEscapeKey,
  debounce
};

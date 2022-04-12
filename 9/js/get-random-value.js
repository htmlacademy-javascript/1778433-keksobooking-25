const getRandomInt = (min, max) => {
  if (min >= 0 & max >= 0 & max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor (Math.random() * (max - min + 1) + min);
  } return 'Неверный диапазон!';
};

const getRandomFloat = (min, max, numsign = 1) => {
  if (min >= 0 & max >= 0 & max > min) {
    const result = Math.random() * (max-min) + min;
    return +result.toFixed(numsign);
  } return 'Неверный диапазон!';
};

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomArrayLength = (array) => {
  const dataArray = new Set();
  const arrayLength = getRandomInt(1, array.length);

  while (dataArray.size < arrayLength) {
    const randomArray = array[getRandomInt(0, array.length-1)];
    dataArray.add(randomArray);
  }
  return [...dataArray];
};


export {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArrayLength};

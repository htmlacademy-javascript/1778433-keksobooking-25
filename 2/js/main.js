let getRandomInt = (min, max) => {
  if (min >= 0 & max >= 0 & max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor (Math.random() * (max - min + 1) + min);
  } return "Неверный диапазон!";
};

console.log(getRandomInt(1, 10));



let getRandomFloat = (min, max, numsign) => {
  if (min >= 0 & max >= 0 & max > min) {
    let result = Math.random() * (max-min) + min;
    return result.toFixed(numsign);
  } return "Неверный диапазон!";
};

console.log(getRandomFloat(3.5, 3.6, 2));


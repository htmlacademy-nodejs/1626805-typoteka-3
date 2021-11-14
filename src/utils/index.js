//Максимум и минимум включаются
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getDateBeforeByMonth(monthRange = 3) {
  // get count day now - 3 months
  const today = new Date();
  const finalDate = new Date(today);
  const currentMonth = today.getMonth();

  finalDate.setMonth(currentMonth - monthRange);

  const getRandomTime = getRandomIntInclusive(+finalDate, +today)

  return new Date(getRandomTime);
}

// data: Date
// return YYYY-MM-DD hh:mm:ss
function formateDate(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth()}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  const seconds = `${date.getSeconds()}`.padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function generateText(maxSentencesCount, items) {
  const randomCount = getRandomIntInclusive(1, maxSentencesCount);
  
  return [...Array(randomCount)].map(() => {
    const randomIndex = getRandomIntInclusive(0, items.length - 1);

    return items[randomIndex];
  }).join();
}

function generateCategory(items) {
  const randomCount = getRandomIntInclusive(1, items.length - 1);

  // Save the index for uniqueness
  const temp = {};

  return [...Array(randomCount)].map(() => {
    const randomIndex = getRandomIntInclusive(1, items.length - 1);

    if (!temp[randomIndex]) {
      temp[randomIndex] = true;
      return items[randomIndex];
    }
  }).filter((item) => item);
}

module.exports = {
  getRandomIntInclusive,
  getDateBeforeByMonth,
  formateDate,
  generateText,
  generateCategory
}
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
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function generateText(maxSentencesCount, items) {
  const randomCount = getRandomIntInclusive(1, maxSentencesCount);
  const result = [];

  for(let i = 0; i < randomCount; i++) {
    const randomIndex = getRandomIntInclusive(0, items.length - 1);

    result.push(items[randomIndex]);
  }

  return result.join();
}

function generateCategory(items) {
  const randomCount = getRandomIntInclusive(1, items.length - 1);
  const result = [];

  // Save the index for uniqueness
  const temp = {};
  for(let i = 0; i < randomCount; i++) {
    const randomIndex = getRandomIntInclusive(1, items.length - 1);

    if (!temp[randomIndex]) {
      result.push(items[randomIndex]);
      temp[randomIndex] = true;
    }
  }

  return result;
}

module.exports = {
  getRandomIntInclusive,
  getDateBeforeByMonth,
  formateDate,
  generateText,
  generateCategory
}
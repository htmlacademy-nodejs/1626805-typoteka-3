'use strict';

const {getRandomNumber} = require(`./number`);

const RANDOM_ITEM_START_IDX = 0;
const RANDOM_ITEMS_START_IDX = 0;
const RANDOM_SEPARATOR = 0.5;

const getRandomItem = (items) => {
  const randomIdx = getRandomNumber(RANDOM_ITEM_START_IDX, items.length - 1);

  return items[randomIdx];
};

const getRandomItems = (items, count) => {
  return getShuffledItems(items).slice(RANDOM_ITEMS_START_IDX, count);
};

const getShuffledItems = (items) => {
  return items
    .slice()
    .sort(() => Math.random() - RANDOM_SEPARATOR);
};

const getItemByKey = (items, key, value) => {
  return items.find((item) => item[key] === value) || null;
};

const removeItemByKey = (items, key, value) => {
  return items.filter((item) => item[key] !== value);
};

module.exports = {
  getRandomItem,
  getRandomItems,
  getShuffledItems,
  getItemByKey,
  removeItemByKey
};

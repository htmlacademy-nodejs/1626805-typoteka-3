'use strict';

const {getRandomNumber} = require(`./number`);

const RANDOM_ITEM_START_IDX = 0;
const RANDOM_ITEM_DECREMENT = 1;
const RANDOM_ITEMS_START_IDX = 0;
const RANDOM_SEPARATOR = 0.5;

const getItemByKey = (items, key, value) => {
  const itemByKey = items.find((item) => item[key] === value);

  return itemByKey || null;
};

const getRandomItem = (items) => {
  const randomIdx = getRandomNumber(RANDOM_ITEM_START_IDX, items.length - RANDOM_ITEM_DECREMENT);

  const randomItem = items[randomIdx];

  return randomItem;
};


const getRandomItems = (items, count) => {
  const randomItems = getShuffledItems(items).slice(RANDOM_ITEMS_START_IDX, count);

  return randomItems;
};


const getShuffledItems = (items) => {
  const shuffledArray = items
    .slice()
    .sort(() => Math.random() - RANDOM_SEPARATOR);

  return shuffledArray;
};

const removeItemByKey = (items, key, value) => {
  const updatedItems = items.filter((item) => item[key] !== value);

  return updatedItems;
};

module.exports = {
  getItemByKey,
  getRandomItem,
  getRandomItems,
  getShuffledItems,
  removeItemByKey,
};

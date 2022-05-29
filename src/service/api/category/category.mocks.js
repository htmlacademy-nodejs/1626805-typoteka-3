'use strict';

const mockedCategories = [`Разное`, `Без рамки`, `IT`];

const mockedArticles = [
  {
    title: `Рок — это протест`,
    createdDate: `2020-10-04T22:47:25.902Z`,
    announce: `Собрать камни бесконечности легко, если вы прирожденный герой. Первая большая ёлка была установлена только в 1938 году. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Он написал больше 30 хитов.`,
    fullText: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    categories: [`Разное`],
    comments: [
      {
        text: `Согласен с автором! Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
      {
        text: `Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы!`,
      },
    ],
  },
  {
    title: `Учим HTML и CSS`,
    createdDate: `2020-10-04T22:47:25.902Z`,
    announce: `Золотое сечение — соотношение двух величин, гармоническая пропорция. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    fullText: `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    categories: [`Без рамки`, `IT`],
    comments: [
      {
        text: `Мне кажется или я уже читал это где-то? Хочу такую же футболку :-)`,
      },
    ],
  },
  {
    title: `Учим HTML и CSS`,
    createdDate: `2020-10-04T22:47:25.902Z`,
    announce: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Это один из лучших рок-музыкантов. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Программировать не настолько сложно, как об этом говорят.`,
    fullText: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Из под его пера вышло 8 платиновых альбомов. Достичь успеха помогут ежедневные повторения. Первая большая ёлка была установлена только в 1938 году. Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Собрать камни бесконечности легко, если вы прирожденный герой. Программировать не настолько сложно, как об этом говорят. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Это один из лучших рок-музыкантов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Ёлки — это не просто красивое дерево. Это прочная древесина. Золотое сечение — соотношение двух величин, гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха.`,
    categories: [`Без рамки`],
    comments: [
      {
        text: `Плюсую, но слишком много буквы!`,
      },
    ],
  },
];

module.exports = {
  mockedCategories,
  mockedArticles,
};

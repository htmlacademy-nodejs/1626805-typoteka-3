'use strict';

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./category`).initCategoryApi;
const dataService = require(`../../data-service`).categoryService;
const {HTTP_STATUS_CODE} = require(`../../../constants`);

// DATA
const mockData = [
  {
    "id": `07wH2`,
    "title": `Как достигнуть успеха не вставая с кресла`,
    "createdDate": `2021-10-01 23:15:55`,
    "announce": `Собрать камни бесконечности легко, если вы прирожденный герой,Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.,Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.,Первая большая ёлка была установлена только в 1938 году`,
    "fullText": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много,Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике,Вы можете достичь всего. Стоит только немного постараться и запастись книгами,Простые ежедневные упражнения помогут достичь успеха,Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами,Первая большая ёлка была установлена только в 1938 году,Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.,Достичь успеха помогут ежедневные повторения,Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.,Программировать не настолько сложно, как об этом говорят`,
    "category": [
      `Кино`,
      `За жизнь`,
      `Программирование`,
      `IT`
    ],
    "comments": [
      {
        "id": `QGLbc`,
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "id": `6M6hx`,
        "text": `Совсем немного...`
      },
      {
        "id": `kU7cV`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `J4ABa`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      }
    ]
  },
  {
    "id": `ACQXq`,
    "title": `Ёлки. История деревьев`,
    "createdDate": `2021-11-02 19:00:33`,
    "announce": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете`,
    "fullText": `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем,Золотое сечение — соотношение двух величин, гармоническая пропорция`,
    "category": [
      `Кино`,
      `За жизнь`
    ],
    "comments": [
      {
        "id": `pzuGf`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      }
    ]
  },
  {
    "id": `89MdV`,
    "title": `Учим HTML и CSS`,
    "createdDate": `2021-10-01 05:50:36`,
    "announce": `Это один из лучших рок-музыкантов,Он написал больше 30 хитов,Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    "fullText": `Золотое сечение — соотношение двух величин, гармоническая пропорция,Собрать камни бесконечности легко, если вы прирожденный герой,Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    "category": [
      `Разное`
    ],
    "comments": [
      {
        "id": `z-fd7`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `AGsPB`,
        "text": `Плюсую, но слишком много буквы!`
      }
    ]
  },
  {
    "id": `LgWCd`,
    "title": `Рок — это протест`,
    "createdDate": `2021-09-03 03:29:37`,
    "announce": `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике`,
    "fullText": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?,Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.,Первая большая ёлка была установлена только в 1938 году,Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами`,
    "category": [
      `Без рамки`,
      `Железо`,
      `IT`,
      `За жизнь`
    ],
    "comments": [
      {
        "id": `T5TCw`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `9sU9D`,
        "text": `Совсем немного...`
      },
      {
        "id": `clJqD`,
        "text": `Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `KXFIH`,
        "text": `Согласен с автором!`
      },
      {
        "id": `lMMvF`,
        "text": `Хочу такую же футболку :-)`
      }
    ]
  },
  {
    "id": `Ceqo_`,
    "title": `Учим HTML и CSS`,
    "createdDate": `2021-09-16 18:48:32`,
    "announce": `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике`,
    "fullText": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры,Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем,Он написал больше 30 хитов,Программировать не настолько сложно, как об этом говорят,Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры,Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.,Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике,Первая большая ёлка была установлена только в 1938 году,Собрать камни бесконечности легко, если вы прирожденный герой,Это один из лучших рок-музыкантов,Это один из лучших рок-музыкантов,Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?,Вы можете достичь всего. Стоит только немного постараться и запастись книгами`,
    "category": [
      `Без рамки`,
      `За жизнь`,
      `Программирование`,
      `Кино`
    ],
    "comments": [
      {
        "id": `yrODG`,
        "text": `Планируете записать видосик на эту тему`
      },
      {
        "id": `iGUeK`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `fevl0`,
        "text": `Плюсую, но слишком много буквы!`
      }
    ]
  },
  {
    "id": `3H9ok`,
    "title": `Лучшие рок-музыканты 20-века`,
    "createdDate": `2021-10-30 02:27:23`,
    "announce": `Он написал больше 30 хитов,Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много,Ёлки — это не просто красивое дерево. Это прочная древесина,Из под его пера вышло 8 платиновых альбомов,Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами`,
    "fullText": `Достичь успеха помогут ежедневные повторения,Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры,Он написал больше 30 хитов,Программировать не настолько сложно, как об этом говорят`,
    "category": [
      `Программирование`
    ],
    "comments": [
      {
        "id": `WOpz5`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `Eb8fs`,
        "text": `Планируете записать видосик на эту тему`
      },
      {
        "id": `RfPr0`,
        "text": `Хочу такую же футболку :-)`
      }
    ]
  }
];

const app = express();
app.use(express.json());

category(app, dataService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });


  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
  });

  test(`Returns list of 4 categories`, () => {
    expect(response.body.length).toBe(4)
  });

  test(`Category names are "Кино", "Разное", "Без рамки", "Программирование"`, () => {
    expect(response.body).toEqual(expect.arrayContaining([`Кино`, `Разное`, `Без рамки`, `Программирование`]));
  });
});

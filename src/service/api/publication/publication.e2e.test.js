'use strict';

// TODO: с тестами полный п***ц нужно подумать как их вообще запускать
// Потому что сейчас используется не файлы а БД
const express = require(`express`);
const request = require(`supertest`);

const publication = require(`./publication`).initPublicationsApi;
const dataService = require(`../../data-service`).publicationService;

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

// INIT Function
const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));

  app.use(express.json());

  publication(app, dataService(cloneData));

  return app;
};


describe(`API returns a list of all publications`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/publications`);
  });


  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
  });


  test(`Returns a list of 5 publications`, () => {
    expect(response.body.length).toBe(6);
  });


  test(`First publication's id equals "bUAlOA"`, () => {
    expect(response.body[0].id).toBe(`07wH2`);
  });
});

describe(`API creates an publication if data is valid`, () => {
  const newPublication = {
    title: `Новый заголовок (текст должен быть как минимум 30 символов)`,
    announce: `Новый анонс (текст должен быть как минимум 30 символов)`,
    fullText: `Новый текст`,
    category: [`Разное`]
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/publications`)
      .send(newPublication);
  });

  test(`Status code 201`, () => {
    expect(response.statusCode).toBe(HTTP_STATUS_CODE.CREATED);
  });

  test(`Returns publication created`, () => {
    expect(response.body).toEqual(expect.objectContaining(newPublication));
  });

  test(`Publications count is changed`, async () => {
    const res = await request(app).get(`/publications`);

    expect(res.body.length).toBe(7);
  });
});

describe(`API refuses to create an atricle if data is invalid`, () => {
  const newPublication = {
    title: `Новый заголовок (текст должен быть как минимум 30 символов)`,
    announce: `Новый анонс (текст должен быть как минимум 30 символов)`,
    category: [`Разное`]
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newPublication)) {
      const badPublication = {...newPublication};
      delete badPublication[key];

      await request(app)
        .post(`/publications`)
        .send(badPublication)
        .expect(HTTP_STATUS_CODE.BAD_REQUEST);
    }
  });
});

describe(`API changes existent publication`, () => {
  const newPublication = {
    id: `07wH2`,
    title: `Новый заголовок (текст должен быть как минимум 30 символов)`,
    announce: `Новый анонс (текст должен быть как минимум 30 символов)`,
    fullText: `Новый-новый текст`,
    category: [`Разное`],
    comments: []
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/publications/07wH2`)
      .send(newPublication);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
  });

  test(`Returns changed publication`, () => {
    expect(response.body).toEqual(expect.objectContaining(newPublication));
  });

  test(`Publication is really changed`, async () => {
    const data = await request(app).get(`/publications/07wH2`);

    expect(data.body.title).toBe(`Новый заголовок (текст должен быть как минимум 30 символов)`);
  });
});

test(`API returns status code 404 when trying to change non-existent atricle`, () => {
  const app = createAPI();

  const validPublication = {
    title: `Новый заголовок (текст должен быть как минимум 30 символов)`,
    announce: `Новый анонс (текст должен быть как минимум 30 символов)`,
    fullText: `Новый-новый текст`,
    category: [`Разное`],
    comments: []
  };

  return request(app)
    .put(`/publications/NOEXST`)
    .send(validPublication)
    .expect(HTTP_STATUS_CODE.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an atricle with invalid data`, () => {
  const app = createAPI();

  const invalidPublicationWithoutTitle = {
    announce: `Новый анонс (текст должен быть как минимум 30 символов)`,
    fullText: `Новый-новый текст`,
    category: [`Разное`],
    comments: []
  };

  return request(app)
    .put(`/publications/ACQXq`)
    .send(invalidPublicationWithoutTitle)
    .expect(HTTP_STATUS_CODE.BAD_REQUEST);
});

describe(`API correctly deletes an publication`, () => {
  const app = createAPI();

  let response;


  beforeAll(async () => {
    response = await request(app)
      .delete(`/publications/07wH2`);
  });


  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
  });

  test(`Returns deleted publication`, () => {
    expect(response.body.id).toBe(`07wH2`);
  });

  test(`Publication count is 5 now`, async () => {
    const data = await request(app).get(`/publications`);

    expect(data.body.length).toBe(5);
  });
});

test(`API refuses to delete non-existent publication`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/publications/NOEXST`)
    .expect(HTTP_STATUS_CODE.NOT_FOUND);
});

describe(`Get comment from publication`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/publications/Ceqo_/comments`);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
  });

  test(`Comment count to be 3`, () => {
    expect(response.body.length).toBe(3);
  });
});

describe(`Create new comment in publication`, () => {
  const app = createAPI();

  const newComment = {
    comment: `Новый комментарий должен юыть минимум 20 символов`
  };

  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/publications/ACQXq/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => {
    expect(response.statusCode).toBe(HTTP_STATUS_CODE.CREATED);
  });

  test(`Return created comment`, () => {
    expect(response.body).toEqual(expect.objectContaining(newComment));
  });

  test(`Comment count to be 2`, async () => {
    const data = await request(app).get(`/publications/ACQXq/comments`);

    expect(data.body.length).toBe(2);
  });
});

test(`API refuses to create a comment to non-existent publication and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/publications/NOEXST/comments`)
    .send({
      comment: `Новый комментарий должен юыть минимум 20 символов`
    })
    .expect(HTTP_STATUS_CODE.NOT_FOUND);
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/publications/Ceqo_/comments/NOEXST`)
    .expect(HTTP_STATUS_CODE.NOT_FOUND);
});



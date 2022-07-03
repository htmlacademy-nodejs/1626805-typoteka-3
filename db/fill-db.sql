/* users */ 
INSERT INTO users VALUES
  (DEFAULT, 'main1@mail.com', '123456', 'Ваня', 'Дорн', 'avatar-1.png', true),
  (DEFAULT, 'main2@mail.com', '123456', 'Джон', 'Траволта', 'avatar-3.png', false),
  (DEFAULT, 'main3@mail.com', '123456', 'Прюс', 'Вылез', 'avatar-3.png', false),
  (DEFAULT, 'main4@mail.com', '123456', 'Джонни', 'Дамп', 'avatar-3.png', false),
  (DEFAULT, 'main5@mail.com', '123456', 'Крис', 'Рот', 'avatar-5.png', false);

/* categories */ 
INSERT INTO categories VALUES
  (DEFAULT, 'Деревья'),
  (DEFAULT, 'За жизнь'),
  (DEFAULT, 'Без рамки'),
  (DEFAULT, 'Разное'),
  (DEFAULT, 'IT'),
  (DEFAULT, 'Музыка'),
  (DEFAULT, 'Кино'),
  (DEFAULT, 'Программирование'),
  (DEFAULT, 'Железо');

/* articles */ 
INSERT INTO articles VALUES
  (DEFAULT, 'Что такое золотое сечение', 'Это один из лучших рок-музыкантов', '2022-04-24T03:22:12.804Z', 'Ёлки — это не просто красивое дерево. Это прочная древесина Первая большая ёлка была установлена только в 1938 году Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры', 'forest.jpg');

/* comments */ 
INSERT INTO comments VALUES
  (DEFAULT, 'Мне кажется или я уже читал это где-то?, Это где ж такие красоты?, Совсем немного...,', 5, 1),
  (DEFAULT, 'Мне кажется или я уже читал это где-то?, Хочу такую же футболку :-),', 2, 1);

/* articles_categories */ 
INSERT INTO articles_categories VALUES
  (1, 4);
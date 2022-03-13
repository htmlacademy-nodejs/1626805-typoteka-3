-- Добавляем значения в таблицу categories
INSERT INTO categories(name) VALUES
  ('Деревья'),
  ('За жизнь'),
  ('Без рамки'),
  ('Разное'),
  ('IT'),
  ('Музыка'),
  ('Кино'),
  ('Программирование'),
  ('Железо');

-- Добавляем значения в таблицу roles
INSERT INTO roles(name) VALUES
  ('гости'),
  ('читатели'),
  ('автор');

-- Добавляем значения в таблицу users
ALTER TABLE users DISABLE TRIGGER ALL;
INSERT INTO users(first_name, last_name, email, avatar, password_hash, role_id) VALUES
  ('Иван1', 'Иванов1', 'ivan1@local.com', '/images/ava1.png', '5f4dcc3b5aa765d61d8327deb882cf99', 10),
  ('Иван2', 'Иванов2', 'ivan2@local.com', '/images/ava2.png', '5f4dcc3b5aa765d61d8327deb882cf99', 10),
  ('Иван3', 'Иванов3', 'ivan3@local.com', '/images/ava3.png', '5f4dcc3b5aa765d61d8327deb882cf99', 11),
  ('Иван4', 'Иванов4', 'ivan4@local.com', '/images/ava4.png', '5f4dcc3b5aa765d61d8327deb882cf99', 11),
  ('Иван5', 'Иванов5', 'ivan5@local.com', '/images/ava5.png', '5f4dcc3b5aa765d61d8327deb882cf99', 12),
  ('Иван6', 'Иванов6', 'ivan6@local.com', '/images/ava6.png', '5f4dcc3b5aa765d61d8327deb882cf99', 12);
ALTER TABLE users ENABLE TRIGGER ALL;

-- Добавляем значения в таблицу comments
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments(text, user_id) VALUES
  ('text-text-text-text-text-text-texttext-text-text-1', 13),
  ('text-text-text-text-text-text-texttext-text-text-2', 13),
  ('text-text-text-text-text-text-texttext-text-text-3', 14),
  ('text-text-text-text-text-text-texttext-text-text-4', 14),
  ('text-text-text-text-text-text-texttext-text-text-5', 15),
  ('text-text-text-text-text-text-texttext-text-text-6', 15),
  ('text-text-text-text-text-text-texttext-text-text-7', 16),
  ('text-text-text-text-text-text-texttext-text-text-8', 16),
  ('text-text-text-text-text-text-texttext-text-text-9', 17),
  ('text-text-text-text-text-text-texttext-text-text-10', 17),
  ('text-text-text-text-text-text-texttext-text-text-11', 18),
  ('text-text-text-text-text-text-texttext-text-text-12', 18);
ALTER TABLE comments ENABLE TRIGGER ALL;

-- Добавляем значения в таблицу publications
ALTER TABLE publications DISABLE TRIGGER ALL;
INSERT INTO publications(title, announcement, text, picture, user_id, category_id, comment_id) VALUES
  ('title1', 'announcement1', 'text1', 'images/picture1.png', 13, 10, 19),
  ('title2', 'announcement2', 'text2', 'images/picture2.png', 13, 11, 20),
  ('title3', 'announcement3', 'text3', 'images/picture3.png', 14, 12, 21),
  ('title4', 'announcement4', 'text4', 'images/picture4.png', 14, 13, 22),
  ('title5', 'announcement5', 'text5', 'images/picture5.png', 15, 14, 23),
  ('title6', 'announcement6', 'text6', 'images/picture6.png', 15, 15, 24),
  ('title7', 'announcement7', 'text7', 'images/picture7.png', 16, 16, 25),
  ('title8', 'announcement8', 'text8', 'images/picture8.png', 16, 17, 26),
  ('title9', 'announcement9', 'text9', 'images/picture9.png', 17, 18, 27),
  ('title9', 'announcement9', 'text9', 'images/picture9.png', 17, 10, 28),
  ('title10', 'announcement10', 'text10', 'images/picture10.png', 18, 11, 29),
  ('title11', 'announcement11', 'text11', 'images/picture11.png', 18, 12, 30);
ALTER TABLE publications ENABLE TRIGGER ALL;

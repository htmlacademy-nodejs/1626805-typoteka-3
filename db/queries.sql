-- Получить список всех категорий (идентификатор, наименование категории)
SELECT id, name FROM categories;

-- Получить список категорий, для которых создана минимум одна публикация
-- (идентификатор, наименование категории);
SELECT cat.id, name from categories cat
  JOIN publications
  ON cat.id = category_id
  GROUP BY cat.id;

-- Получить список категорий с количеством публикаций (идентификатор,
-- наименование категории, количество публикаций в категории);
SELECT cat.id, name, count(category_id) FROM categories cat
  JOIN publications
  ON cat.id = category_id
  GROUP BY cat.id;

-- Получить список публикаций (идентификатор публикации, заголовок публикации,
-- анонс публикации, дата публикации, имя и фамилия автора, контактный email,
-- количество комментариев, наименование категорий). Сначала свежие публикации;
SELECT
  publications.id,
  publications.title,
  publications.announcement,
  publications.created_at,
  users.first_name,
  users.last_name,
  users.email,
  count(comment_id),
  string_agg(categories.name, ', ')
FROM publications
  JOIN users
    ON publications.user_id = users.id
  JOIN comments
    ON comments.id = comment_id
  JOIN categories
    ON categories.id = category_id
GROUP BY publications.id, users.first_name, users.last_name, users.email
ORDER BY publications.created_at DESC;

-- Получить полную информацию определённой публикации (идентификатор публикации,
-- заголовок публикации, анонс, полный текст публикации, дата публикации,
-- путь к изображению, имя и фамилия автора, контактный email, количество
-- комментариев, наименование категорий);
SELECT
  publications.id,
  publications.title,
  publications.announcement,
  publications.text,
  publications.created_at,
  publications.picture,
  users.first_name,
  users.last_name,
  users.email,
  count(comment_id),
  string_agg(categories.name, ', ')
FROM publications
  JOIN users
    ON publications.user_id = users.id
  JOIN comments
    ON comments.id = comment_id
  JOIN categories
    ON categories.id = category_id
GROUP BY publications.id, users.first_name, users.last_name, users.email;

-- Получить список из 5 свежих комментариев (идентификатор комментария,
-- идентификатор публикации, имя и фамилия автора, текст комментария);
SELECT
  comments.id,
  publications.id,
  users.first_name,
  users.last_name,
  comments.text
FROM comments
  JOIN users
    ON comments.user_id = users.id
  JOIN publications
    ON publications.user_id = users.id
GROUP BY publications.id, comments.id, users.first_name, users.last_name
LIMIT 5;

-- Получить список комментариев для определённой публикации (идентификатор
-- комментария, идентификатор публикации, имя и фамилия автора, текст
-- комментария). Сначала новые комментарии;
SELECT
  comments.id,
  publications.id,
  users.first_name,
  users.last_name,
  comments.text
FROM comments
  JOIN users
    ON comments.user_id = users.id
  JOIN publications
    ON publications.user_id = users.id
WHERE publications.id = 45
  GROUP BY publications.id, comments.id, users.first_name, users.last_name;

-- Обновить заголовок определённой публикации на «Как я встретил Новый год»;
UPDATE publications
SET title = 'Как я встретил Новый год'
WHERE id = 45;
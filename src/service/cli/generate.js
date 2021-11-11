'use strict';

const fs = require(`fs`);
const { 
  getRandomIntInclusive,
  getDateBeforeByMonth,
  formateDate,
  generateText,
  generateCategory
 } = require(`../../utils`);
const { ExitCode } = require(`../../constants`);

const TITLE = [
  'Ёлки. История деревьев',
  'Как перестать беспокоиться и начать жить',
  'Как достигнуть успеха не вставая с кресла',
  'Обзор новейшего смартфона',
  'Лучшие рок-музыканты 20-века',
  'Как начать программировать',
  'Учим HTML и CSS',
  'Что такое золотое сечение',
  'Как собрать камни бесконечности',
  'Борьба с прокрастинацией',
  'Рок — это протест',
  'Самый лучший музыкальный альбом этого года'
];

const SENTENCES = [
  'Ёлки — это не просто красивое дерево. Это прочная древесина.',
  'Первая большая ёлка была установлена только в 1938 году.',
  'Вы можете достичь всего. Стоит только немного постараться и запастись книгами.',
  'Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.',
  'Золотое сечение — соотношение двух величин, гармоническая пропорция.',
  'Собрать камни бесконечности легко, если вы прирожденный герой.',
  'Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.',
  'Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.',
  'Программировать не настолько сложно, как об этом говорят.',
  'Простые ежедневные упражнения помогут достичь успеха.',
  'Это один из лучших рок-музыкантов.',
  'Он написал больше 30 хитов.',
  'Из под его пера вышло 8 платиновых альбомов.',
  'Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.',
  'Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?',
  'Достичь успеха помогут ежедневные повторения.',
  'Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.',
  'Как начать действовать? Для начала просто соберитесь.',
  'Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.',
  'Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.'
  
];

const CATEGORIES = [
  'Деревья',
  'За жизнь',
  'Без рамки',
  'Разное',
  'IT',
  'Музыка',
  'Кино',
  'Программирование',
  'Железо'
];

const generateObject = () => {
  const randomIndexForTitle = getRandomIntInclusive(0, TITLE.length - 1);
  const datePublication = getDateBeforeByMonth();
  
  return {
    title: TITLE[randomIndexForTitle],
    createdDate: formateDate(datePublication),
    announce: generateText(5, SENTENCES),
    fullText: generateText(SENTENCES.length - 1, SENTENCES),
    сategory: generateCategory(CATEGORIES)
  }
}

module.exports = {
  name: '--generate',
  run(count) {
    const [value] = count;
    const countNumber = parseInt(value);
    const countIsNaN = Number.isNaN(countNumber);
    const result = [];

    // Если переданное значение является числом
    if (!countIsNaN) {
      if (countNumber > 1000) {
        console.info('Не больше 1000 публикаций');
        process.exit(ExitCode.error);
      } else {
        for (let i = 0; i < countNumber; i++) {
          result.push(generateObject());
        }
      }
    } else {
      result.push(generateObject());
    }

    const content = JSON.stringify(result, '', 2);

    fs.writeFile('mock.json', content, (err) => {
      if (err) {
        return console.error(`Ошибка при записи файла...`);
      }
    
      return console.info(`Файл создан.`);
    });
  }
}
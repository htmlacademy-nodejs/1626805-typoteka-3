'use strict';

const {Router} = require(`express`);
const articleRouter = new Router();

articleRouter.get(`/:id`, (req, res) => {
  const content = {
    isPost: true,
    article: {
      image: {
        fileName: `sea-fullsize@1x.jpg`,
        alt: `пейзаж море, скалы, пляж`,
      },
      date: {
        stamp: `2019-03-21T20:33`,
        day: `21.03.2019`,
        time: `20:33`,
      },
      title: `AirPods в один клик`,
      subTitle: `Бирюзовое доверие`,
      text: [
        `У Apple иногда попадаются интерфейсы, за которые создателей хочется сильно поругать — к примеру интерфейс публикации приложения в AppStore, для которого я уже неделю восстановливаю свой аккаунт разработчика.`,
        `Или интерфейс подключения AirPods на макбуке. Чтобы переключить наушники между телефоном и компьютером, нужно сначала нажать на значок звука, затем дождаться, когда в списке устройств появятся наушники, потом нажать на них и дождаться, пока случится вся магия подключения. Иногда по загадочным причинам магия не случается, и операцию нужно повторить, выполняя все те же клики-ожидания-клики — бесит.`,
      ],
    },
    account: {
      type: `user`,
      name: `Алёна Фролова`,
      avatar: `img/avatar-2.png`,
    },
    scriptList: [`js/main.js`],
    comments: {
      hasUserError: false,
      list: [
        {
          account: {
            type: `user`,
            avatar: `img/avatar-1.png`,
            name: `Евгений Петров`,
          },
          date: {
            stamp: `2019-03-21T20:33`,
            day: `21.03.2019`,
            time: `20:33`,
          },
          text: `Автор, ты все выдумал, покайся`,
          articleTitle: `AirPods в один клик`,
        },
        {
          account: {
            type: `user`,
            avatar: `img/avatar-5.png`,
            name: `Александр Марков`,
          },
          date: {
            stamp: `2019-03-21T20:33`,
            day: `21.03.2019`,
            time: `20:33`,
          },
          text: `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
          articleTitle: `AirPods в один клик`,
        },
        {
          account: {
            type: `user`,
            avatar: `img/avatar-4.png`,
            name: `Евгений Петров`,
          },
          date: {
            stamp: `2019-03-21T20:33`,
            day: `21.03.2019`,
            time: `20:33`,
          },
          text: `Автор, ты все выдумал, покайся`,
          articleTitle: `AirPods в один клик`,
        },
        {
          account: {
            type: `user`,
            avatar: `img/avatar-3.png`,
            name: `Александр Марков`,
          },
          date: {
            stamp: `2019-03-21T20:33`,
            day: `21.03.2019`,
            time: `20:33`,
          },
          text: `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
          articleTitle: `AirPods в один клик`,
        },
      ],
    },
  };

  res.render(`pages/articles/article`, content);
});

articleRouter.get(`/edit/:id`, (req, res) => {
  const content = {
    type: `edit`,
    article: {
      image: {
        fileName: `sea-fullsize@1x.jpg`,
        alt: `пейзаж море, скалы, пляж`,
      },
      date: {
        stamp: `2019-03-21T20:33`,
        day: `21.03.2019`,
        time: `20:33`,
      },
      title: `AirPods в один клик`,
      subTitle: `Бирюзовое доверие`,
      text: [
        `У Apple иногда попадаются интерфейсы, за которые создателей хочется сильно поругать — к примеру интерфейс публикации приложения в AppStore, для которого я уже неделю восстановливаю свой аккаунт разработчика.`,
        `Или интерфейс подключения AirPods на макбуке. Чтобы переключить наушники между телефоном и компьютером, нужно сначала нажать на значок звука, затем дождаться, когда в списке устройств появятся наушники, потом нажать на них и дождаться, пока случится вся магия подключения. Иногда по загадочным причинам магия не случается, и операцию нужно повторить, выполняя все те же клики-ожидания-клики — бесит.`,
      ],
      categoryList: [
        {
          id: `category-1`,
          name: `Автомобили`,
        },
        {
          id: `category-2`,
          name: `Бизнес`,
        },
        {
          id: `category-3`,
          name: `Дизайн`,
        },
      ],
    },
    account: {
      type: `admin`,
    },
    scriptList: [`js/vendor.js`, `js/main.js`],
  };

  res.render(`pages/articles/edit`, content);
});

articleRouter.get(`/add`, (req, res) => {
  const content = {
    type: `add`,
    article: {
      image: null,
      date: null,
      title: ``,
      subTitle: ``,
      text: [],
      categoryList: [],
    },
    account: {
      type: `admin`,
    },
    scriptList: [`js/vendor.js`, `js/main.js`],
  };

  res.render(`pages/articles/edit`, content);
});

articleRouter.get(`/category/:id`, (req, res) => {
  const content = {
    title: `Типотека`,
    displayedTitle: `Бизнес`,
    description: `Это приветственный текст, который владелец блога может выбрать, чтобы описать себя 👏`,
    account: {
      type: `user`,
      name: `Алёна Фролова`,
      avatar: `img/avatar-2.png`,
    },
    hasContent: true,
    hasHot: true,
    hasLastComments: true,
  };

  res.render(`pages/articles/categories`, content);
});



module.exports = articleRouter;

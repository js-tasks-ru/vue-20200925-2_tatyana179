import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Получает митап с API по id
 * @param meetupId - параметр id митапа
 * @return {Promise}
 */
export async function fetchMeetup(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((res) => res.json());
}

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    meetup: {},
    imageLink: '',
  },

  mounted() {
    this.fetchMeetup();
  },

  computed: {
    //
  },

  methods: {
    async fetchMeetup() {
      const rawMeetup = await fetchMeetup(MEETUP_ID);
      this.meetup = {
        ...rawMeetup,
        cover: getMeetupCoverLink(rawMeetup),
        localDate: new Date(rawMeetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        ISODate: new Date(rawMeetup.date).toDateString(),
        agenda: rawMeetup.agenda && rawMeetup.agenda.map((item) => ({
          ...item,
          title: item.title ? item.title : agendaItemTitles[item.type],
          iconName: item.type && agendaItemIcons[item.type],
        })),
      }
    },
  },
});

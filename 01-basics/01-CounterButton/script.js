import Vue from './vue.esm.browser.js';

// const app = ...
// Рекомендуется использовать МЕТОД в качестве обработчика события

const app = new Vue({
  el: '#app',
  template: '<button @click="increment">{{count}}</button>',
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    increment() {
      this.count++;
    },
  },
});

export const CounterButton = {
  // Шаблон потребуется отредактировать
  template: '<button type="button" @click="onClick">{{ count }}</button>',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  // Компонент должен иметь модель
  model: {
    prop: 'count',
    event: 'increment',
  },

  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    onClick() {
      this.$emit('increment', this.count + 1)
    },
  },
};

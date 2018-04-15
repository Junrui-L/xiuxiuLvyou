<template>
  <div class="radio-box cube-radio-group clearfix" :class="_groupClass" :data-horz="horizontal">
    <div class="tit fl">{{ title }}</div>
    <div class="options fl">
      <div class="cube-radios fl" v-for="option in options" :class="_containerClass" >
        <div class="radio-wrap" :class="_wrapClass(option)">
          <input class="radio-input" type="radio" :disabled="option.disabled" v-model="radioValue" :value="option.value || option">
          <span class="radio-ui ">
          {{option.label}}
        </span>
          <!--<span class="radio-label">{{option.label || option}}</span>-->
        </div>
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'cube-radio'

  const EVENT_INPUT = 'input'

  export default {
    name: COMPONENT_NAME,
    props: {
      value: '',
      title: {
        type: String,
        default: '性别'
      },
      options: {
        type: Array,
        required: true
      },
      position: {
        type: String,
        default: 'left'
      },
      horizontal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        radioValue: this.value
      }
    },
    computed: {
      _containerClass() {
        if (this.horizontal) {
          return ''
        }
      },
      _groupClass() {
        if (!this.horizontal) {
          return ''
        }
      }
    },
    watch: {
      value(newV) {
        this.radioValue = newV
      },
      radioValue(newV) {
        this.$emit(EVENT_INPUT, newV)
      }
    },
    methods: {
      _wrapClass(option) {
        return {
          'cube-radio_selected': this.radioValue === (option.value || option),
          'cube-radio_disabled': option.disabled,
          // 'border-bottom-1px': !this.horizontal
        }
      }
    }
  }
</script>

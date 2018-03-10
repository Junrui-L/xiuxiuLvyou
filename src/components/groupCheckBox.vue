<template>
  <div class="cube-checkbox-group" ref="group" :class="groupClass" :data-horz="horizontal">
    <slot>
      <CheckBox
        v-for="(option, index) in options"
        :key="index"
        :label="option.value || option"
        :checkText = "option.value || option"
        :disabled="option.disabled">{{option.label || option}} {{index}}</CheckBox>
    </slot>

  </div>
</template>

<script>
  import CheckBox from '../components/check-box.vue'
  const COMPONENT_NAME = 'cube-checkbox-group'

  const EVENT_INPUT = 'input'
  const EVENT_CHECKED = 'checked'
  const EVENT_CANCLE_CHECKED = 'cancel-checked'

  export default {
    name: COMPONENT_NAME,
    props: {
      value: {
        type: Array
      },
      horizontal: {
        type: Boolean,
        default: false
      },
      options: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        _value: [],
        _checkboxGroup: true
      }
    },
    computed: {
      groupClass() {
        if (!this.horizontal) {
          return 'border-top-1px border-bottom-1px'
        }
      }
    },
    components: {
      CheckBox
    },
    watch: {
      value: {
        immediate: true,
        handler (newValue, oldValue) {
          this._value = this.value.concat()
        }
      }
    },
    mounted () {
      this.$on(EVENT_CHECKED, function (value) {
        this._value.push(value)
        this.$emit(EVENT_INPUT, this._value)
      })
      this.$on(EVENT_CANCLE_CHECKED, function (value) {
        let index = this._value.indexOf(value)
        this._value.splice(index, 1)
        this.$emit(EVENT_INPUT, this._value)
      })
    }
  }
</script>


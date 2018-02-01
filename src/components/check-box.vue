<template>
  <div class="check-box" :class="_containerClass" >
    <label class="checkbox-wrap" :class="_wrapClass">
      <input class="checkbox-input" type="checkbox" :disabled="disabled" v-model="checkValue">
      <span class="checkbox-ui">
        {{ checkText }}
      </span>
      <span class="checkbox-label">
        <slot>{{label}}</slot>
      </span>
    </label>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'cube-checkbox'

  const EVENT_INPUT = 'input'
  const EVENT_CHECKED = 'checked'
  const EVENT_CANCLE_CHECKED = 'cancel-checked'

  export default {
    name: COMPONENT_NAME,
    props: {
      value: {
        type: [Boolean, String]
      },
      checkText: {
        type: String
      },
      label: {
        type: [Boolean, String],
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'left'
      }
    },
    data () {
      const parent = this.$parent
      const isInGroup = parent.$data._checkboxGroup
      const isInHorizontalGroup = isInGroup && parent.$props.horizontal
      return {
        isInGroup,
        isInHorizontalGroup
      }
    },
    computed: {
      checkValue: {
        get () {
          if (this.isInGroup) {
            return this.$parent.value.indexOf(this.label) > -1
          } else {
            return Boolean(this.value)
          }
        },
        set (newValue) {
          const emitValue = this.label && newValue ? this.label : newValue
          const parentEmitEvent = newValue ? EVENT_CHECKED : EVENT_CANCLE_CHECKED
          this.$emit(EVENT_INPUT, emitValue)
          if (this.isInGroup) {
            this.$parent.$emit(parentEmitEvent, this.label || newValue, this)
          }
        }
      },
      _containerClass() {
        if (this.isInHorizontalGroup) {
          return 'border-right-1px'
        }
      },
      _wrapClass() {
        const isInHorizontalGroup = this.isInHorizontalGroup
        return {
          'cube-checkbox_checked': this.checkValue,
          'cube-checkbox_disabled': this.disabled,
          'border-bottom-1px': this.isInGroup && !isInHorizontalGroup
        }
      }
    }
  }
</script>


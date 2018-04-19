<template>
  <div class="switch-option">
    <span class="name">{{ name }}</span>
    <div class="switch-ellipse" :class="{ active: checked }" @click="clickSwitch">
      <span class="switch-circle" :class="{ active: checked }"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'switch-option'
  export default {
    name: COMPONENT_NAME,
    props: {
      name: {
        type: String
      },
      value: null,
      isDisable: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        checked: this.value,
        disables: this.isDisable
      }
    },
    watch: {
      checked: function (newValue) {
        this.$emit('update:value', newValue)
      }
    },
    methods: {
      clickSwitch () {
        if(this.isDisable) {
          this.checked = true
          this.$createDialog({
            type: 'alert',
            title: '温馨提示',
            content: '很抱歉，您想预约的向导在该日期已组团，请选参加团游或重新下单！'
          }).show()
          return
        } else {
          this.checked = !this.checked

        }

      }
    }
  }
</script>


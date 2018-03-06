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
        default: false
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
        if(!this.isDisable) {
          this.checked = !this.checked
        } else {
          this.$createToast({
            txt: '该玩不支持团游',
            type: 'error',
            mask: true,
            time: 2000
          }).show();
          return
        }

      }
    }
  }
</script>


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
      value: null
    },
    data() {
      return {
        checked: this.value
      }
    },
    watch: {
      checked: function (newValue) {
        this.$emit('update:value', newValue)
      }
    },
    methods: {
      clickSwitch: function () {
        this.checked = !this.checked
      }
    }
  }
</script>


<template>
  <div class="select-option">
    <span class="name">{{ name }}</span>
    <span class="select" @click="showPicker">{{ selected }}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'select-option'
  export default {
    name: COMPONENT_NAME,
    props: {
      name: {
        type: String
      },
      options: {
        type: Array
      },
      value: null
    },
    data() {
      return {
        selected: this.value
      }
    },
    watch: {
      selected: function (newValue) {
        this.$emit('update:value', newValue)
      }
    },
    mounted() {
      const self = this
      this.picker = this.$createPicker({
        title: `Choose ${this.name}`,
        data: [this.options],
        cancelTxt: 'cancel',
        confirmTxt: 'confirm',
        onValueChange(selectedVal) {
          self.selected = selectedVal[0]
        }
      })
    },
    methods: {
      showPicker() {
        this.picker.show()
      }
    }
  }
</script>


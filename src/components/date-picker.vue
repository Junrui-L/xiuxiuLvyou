<!--<template>-->
  <!--<cube-cascade-picker-->
    <!--ref="cascadePicker"-->
    <!--title="出行日期"-->
    <!--:data="data"-->
    <!--:selectedIndex="selectedIndex"-->
    <!--@select="select"-->
    <!--@cancel="cancel">-->
  <!--</cube-cascade-picker>-->
<!--</template>-->

<!--<script>-->
  <!--const COMPONENT_NAME = 'date-picker'-->
  <!--const EVENT_SELECT = 'select'-->
  <!--const EVENT_CANCEL = 'cancel'-->

  <!--export default {-->
    <!--name: COMPONENT_NAME,-->
    <!--props: {-->
      <!--min: {-->
        <!--type: Array,-->
        <!--default() {-->
          <!--return [2018, 3, 1]-->
        <!--}-->
      <!--},-->
      <!--max: {-->
        <!--type: Array,-->
        <!--default() {-->
          <!--return [2020, 12, 31]-->
        <!--}-->
      <!--},-->
      <!--selectedIndex: {-->
        <!--type: Array,-->
        <!--default() {-->
          <!--return [0, 0, 0]-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--data() {-->
      <!--return {-->
      <!--}-->
    <!--},-->
    <!--computed: {-->
      <!--data() {-->
        <!--let data = range(this.min[0], this.max[0], false, '年')-->

        <!--data.forEach(year => {-->
          <!--let minMonth = year.value === this.min[0] ? this.min[1] : 1-->
          <!--let maxMonth = year.value === this.max[0] ? this.max[1] : 12-->

          <!--year.children = range(minMonth, maxMonth, true, '月')-->
          <!--year.children.forEach(month => {-->
            <!--let day = 30-->
            <!--if ([1, 3, 5, 7, 8, 10, 12].includes(month.value)) {-->
              <!--day = 31-->
            <!--} else {-->
              <!--if (month.value === 2) {-->
                <!--day = !(year.value % 400) || (!(year.value % 4) && year.value % 100) ? 29 : 28-->
              <!--}-->
            <!--}-->
            <!--let minDay = year.value === this.min[0] && month.value === this.min[1] ? this.min[2] : 1-->
            <!--let maxDay = year.value === this.max[0] && month.value === this.max[1] ? this.max[2] : day-->
            <!--month.children = range(minDay, maxDay, true, '日')-->
          <!--})-->
        <!--})-->
        <!--console.log(data)-->
        <!--return data-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--show() {-->
        <!--this.$refs.cascadePicker.show()-->
      <!--},-->
      <!--hide() {-->
        <!--this.$refs.cascadePicker.hide()-->
      <!--},-->
      <!--select(selectedVal, selectedIndex, selectedText) {-->
        <!--this.$emit(EVENT_SELECT, selectedVal, selectedIndex, selectedText)-->
      <!--},-->
      <!--cancel() {-->
        <!--this.$emit(EVENT_CANCEL)-->
      <!--}-->
    <!--}-->
  <!--}-->

  <!--function range(n, m, polyfill = false, unit = '') {-->
    <!--let arr = []-->
    <!--for (let i = n; i <= m; i++) {-->
      <!--let value = (polyfill && i < 10 ? '0' + i : i) + unit-->
      <!--arr.push({-->
        <!--text: value,-->
        <!--value: i-->
      <!--})-->
    <!--}-->
    <!--return arr-->
  <!--}-->
<!--</script>-->
<template>
  <cube-cascade-picker
    ref="cascadePicker"
    :data="data"
    :selectedIndex="selectedIndex"
    :title="title"
    :cancel-txt="cancelTxt"
    :confirm-txt="confirmTxt"
    :swipe-time="swipeTime"
    :z-index="zIndex"
    @select="_select"
    @cancel="_cancel"
    @change="_change">
  </cube-cascade-picker>
</template>

<script>
  // import apiMixin from '../../common/mixins/api'
  // import pickerMixin from '../../common/mixins/picker'

  const COMPONENT_NAME = 'cube-date-picker'
  const EVENT_SELECT = 'select'
  const EVENT_CANCEL = 'cancel'
  const EVENT_CHANGE = 'change'

  const UNIT_LIST = ['year', 'month', 'date', 'hour', 'minute', 'second']
  const UNIT_RELATED_LIST = [
    {
      txt: '年',
      pad: false
    },
    {
      txt: '月',
      natureMin: 1,
      natureMax: 12,
      pad: false
    },
    {
      txt: '日',
      natureMin: 1,
      natureMax: 31,
      pad: false
    },
    {
      txt: '点',
      natureMin: 0,
      natureMax: 23,
      pad: false,
      natureRange: range(0, 23, false, '点')
    },
    {
      txt: '分',
      natureMin: 0,
      natureMax: 59,
      pad: true,
      natureRange: range(0, 59, true, '分')
    },
    {
      txt: '秒',
      natureMin: 0,
      natureMax: 59,
      pad: true,
      natureRange: range(0, 59, true, '秒')
    }
  ]

  export default {
    name: COMPONENT_NAME,
    props: {
      title: {
        type: String
      },
      cancelTxt: {
        type: String,
        default: '取消'
      },
      confirmTxt: {
        type: String,
        default: '确定'
      },
      swipeTime: {
        type: Number,
        default: 2500
      },
      zIndex: {
        type: Number
      },
      min: {
        type: [Date, Array],
        default() {
          return new Date(2018, 1,  1)
        }
      },
      max: {
        type: [Date, Array],
        default() {
          return new Date(2020, 12, 31)
        }
      },
      startColumn: {
        type: String,
        default() {
          return 'year'
        }
      },
      columnCount: {
        type: Number,
        default: 3
      },
      value: {
        type: [Date, Array],
        default() {
          return this.min
        }
      }
    },
    computed: {
      startIndex() {
        let startIndex = UNIT_LIST.indexOf(this.startColumn)
        return startIndex < 0 ? 0 : startIndex
      },
      minArray() {
        return this.min instanceof Date
          ? dateToArray(this.min).slice(this.startIndex, this.startIndex + this.columnCount)
          : this.min
      },
      maxArray() {
        return this.max instanceof Date
          ? dateToArray(this.max).slice(this.startIndex, this.startIndex + this.columnCount)
          : this.max
      },
      valueArray() {
        return this.value instanceof Date
          ? dateToArray(this.value).slice(this.startIndex, this.startIndex + this.columnCount)
          : this.value
      },
      data() {
        let data = []
        this._generateData(this.startIndex, 0, data)

        return data
      },
      selectedIndex() {
        let selectedIndex = []
        let data = this.data
        let findIndex

        for (let i = 0; i < this.columnCount && i < 6 - this.startIndex; i++) {
          findIndex = data.findIndex((item) => {
            return this.valueArray[i] && item.value === this.valueArray[i]
          })
          selectedIndex[i] = findIndex !== -1 ? findIndex : 0
          data = data[selectedIndex[i]].children
        }

        return selectedIndex
      }
    },
    methods: {
      show() {
        this.$refs.cascadePicker.show()
      },
      hide() {
        this.$refs.cascadePicker.hide()
      },
      _select(selectedVal, selectedIndex, selectedText) {
        this.$emit(EVENT_SELECT, this._arrayToDate(selectedVal), selectedVal, selectedText)
      },
      _cancel() {
        this.$emit(EVENT_CANCEL)
      },
      _change(i, newIndex) {
        this.$emit(EVENT_CHANGE, i, newIndex)
      },
      _generateData(i, count, item) {
        if (count === 0) {
          let min = i === 0 ? this.minArray[0] : Math.max(this.minArray[0], UNIT_RELATED_LIST[i].natureMin)
          let max = i === 0 ? this.maxArray[0] : Math.min(this.maxArray[0], UNIT_RELATED_LIST[i].natureMax)
          item.push(...range(min, max, UNIT_RELATED_LIST[i].pad, UNIT_RELATED_LIST[i].txt, true, true))
        } else {
          if (i < 3 || item.isMin || item.isMax) {
            let natureMax = i === 2 ? computeNatrueMaxDay(item.value, item.year) : UNIT_RELATED_LIST[i].natureMax
            let min = item.isMin ? Math.max(this.minArray[count], UNIT_RELATED_LIST[i].natureMin) : UNIT_RELATED_LIST[i].natureMin
            let max = item.isMax ? Math.min(this.maxArray[count], natureMax) : natureMax

            let storageYear = i === 1 && this.startIndex === 0 && this.columnCount >= 3 && item.value
            item.children = range(min, max, UNIT_RELATED_LIST[i].pad, UNIT_RELATED_LIST[i].txt, item.isMin, item.isMax, storageYear)
          } else {
            item.children = UNIT_RELATED_LIST[i].natureRange
          }
        }
        if (count < this.columnCount - 1 && i < 5) {
          (item.children || item).forEach(subItem => {
            this._generateData(i + 1, count + 1, subItem)
          })
        }
      },
      _arrayToDate(selectedVal) {
        const args = []
        const defaultDateArray = dateToArray(new Date(0))

        for (let i = 0; i < 6; i++) {
          if (i < this.startIndex) {
            args[i] = defaultDateArray[i]
          } else if (i >= this.startIndex + this.columnCount) {
            args[i] = UNIT_RELATED_LIST[i].natureMin
          } else {
            args[i] = selectedVal[i - this.startIndex]
          }
        }
        // Month need to subtract 1.
        args[1]--

        return new Date(...args)
      }
    }
  }

  function range(min, max, pad = false, unit = '', fatherIsMin, fatherIsMax, year) {
    let arr = []
    for (let i = min; i <= max; i++) {
      const value = (pad && i < 10 ? '0' + i : i) + unit
      const object = {
        text: value,
        value: i
      }

      if (fatherIsMin && i === min) object.isMin = true
      if (fatherIsMax && i === max) object.isMax = true
      if (year) object.year = year

      arr.push(object)
    }
    return arr
  }

  function computeNatrueMaxDay(month, year) {
    let natureMaxDay = 30
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) > -1) {
      natureMaxDay = 31
    } else {
      if (month === 2) {
        natureMaxDay = !year || (!(year % 400) || (!(year % 4) && year % 100)) ? 29 : 28
      }
    }

    return natureMaxDay
  }

  function dateToArray(date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
  }
</script>

<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>Date of Birth</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="date-box">
        <div class="day-box">
          <p>Day</p>
          <VueScrollPicker
            v-model="date.day"
            empty="Select Day"
            :options="daysList"
          />
        </div>
        <div class="month-box">
          <p>Month</p>
          <VueScrollPicker v-model="date.month" :options="monthNames" />
        </div>
        <div class="year-box">
          <p>Year</p>
          <VueScrollPicker v-model="date.year" :options="yearList" />
        </div>
      </div>
      <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn
          class="btn full-width btn1"
          flat
          dense
          @click="setDate(date.day, date.month, date.year)"
        >
          Done
        </q-btn>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { DateTime } from 'luxon'
import { VueScrollPicker } from 'vue-scroll-picker'

const minYear = new Date().getFullYear() - 100
const maxYear = new Date().getFullYear() - 18
const yearList = []

for (let i = minYear; i < maxYear; i++) {
  yearList.push(i + 1)
}

export default {
  name: 'DateSelector',
  props: {
    sendValue: {
      type: String,
      default: '',
      filter: {
        selectDate: function (value) {
          return {
            day: value.substring(0, 2),
            month: value.substring(3, 5),
            year: value.substring(6, 10),
          }
        },
      },
    },
    fieldName: {
      type: String,
      default: '',
    },
  },
  components: {
    VueScrollPicker,
  },
  data() {
    return {
      yearList,
      monthNames: [
        { value: 1, name: 'January' },
        { value: 2, name: 'February' },
        { value: 3, name: 'March' },
        { value: 4, name: 'April' },
        { value: 5, name: 'May' },
        { value: 6, name: 'June' },
        { value: 7, name: 'July' },
        { value: 8, name: 'August' },
        { value: 9, name: 'September' },
        { value: 10, name: 'October' },
        { value: 11, name: 'November' },
        { value: 12, name: 'December' },
      ],
      date: {
        day: ref(null),
        month: ref(null),
        year: ref(maxYear),
      },
      daysList: computed(() => {
        const days = []
        if (this.date.month == 2) {
          if (this.date.year % 4 == 0) {
            for (let i = 1; i <= 29; i++) {
              days.push(i)
            }
          } else {
            for (let i = 1; i <= 28; i++) {
              days.push(i)
            }
          }
        } else {
          if (
            this.date.month == 1 ||
            this.date.month == 3 ||
            this.date.month == 5 ||
            this.date.month == 7 ||
            this.date.month == 8 ||
            this.date.month == 10 ||
            this.date.month == 12
          ) {
            for (let i = 1; i <= 31; i++) {
              days.push(i)
            }
          } else {
            for (let i = 1; i <= 30; i++) {
              days.push(i)
            }
          }
        }
        return days
      }),
    }
  },
  mounted() {
    if (this.sendValue) {
      const newDate = this.sendValue.split('-')
      const dates = new Date()
      dates.setDate(newDate[0])
      dates.setMonth(newDate[1] - 1)
      dates.setFullYear(newDate[2])

      this.selectDate(
        dates.getDate(),
        dates.getMonth() + 1,
        dates.getFullYear()
      )
    } else {
      this.todayDate()
    }
  },
  methods: {
    todayDate() {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear()

      this.selectDate(parseInt(dd), parseInt(mm), parseInt(yyyy))
    },
    selectDate(day, month, year) {
      this.date.day = day
      this.date.month = month
      this.date.year = year
    },
    setDate() {
      let newDate = this.date.year
      newDate +=
        this.date.month <= 9 ? '-0' + this.date.month : '-' + this.date.month
      newDate += this.date.day <= 9 ? '-0' + this.date.day : '-' + this.date.day
      this.$emit('selectValue', {
        value: DateTime.fromFormat(newDate, 'yyyy-MM-dd')
          .setLocale('en')
          .toFormat('dd-MM-yyyy'),
        field: this.fieldName,
      })
    },
  },
}
</script>
<style lang="scss">
// $
@import '../../css/components/date-selector.scss';
@import 'vue-scroll-picker/lib/style.css';
</style>

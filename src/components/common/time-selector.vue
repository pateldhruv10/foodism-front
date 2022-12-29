<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.PopUpTitle.totalPreTime }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="time-box">
        <div class="time-set">
          <p>Hrs</p>
          <VueScrollPicker
            v-model="val.hour"
            empty="Select Day"
            :options="hourList"
          />
        </div>
        <div class="time-set">
          <p>Mins</p>
          <VueScrollPicker
            v-model="val.min"
            empty="Select Day"
            :options="minuteList"
          />
        </div>
      </div>
      <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn
          class="btn full-width btn1"
          flat
          dense
          @click="setData()"
        > 
          Done
        </q-btn>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import { ref } from 'vue';
import { VueScrollPicker } from 'vue-scroll-picker'

const hourList = createTimeLoop(24);

const minuteList = createTimeLoop(60);

function createTimeLoop(number) {
  const time = []
  time.push(`00`);

  for (let i = 0; i < number; i++) {
    let val = i + 1
    time.push(val < 10 ? `0${val}` : val)
  }

  return time;
}

export default {
  name: "HourMinuteSelector",
  props: {
    sendValue : {
      type: String,
      default: '',
    },
    fieldName: {
      type: String,
      default: '',
    },
    sendDisplayField: {
      type: String,
      default: null,
    }
  },
  components: {
    VueScrollPicker
  },
  data () {
    return {
      hourList,
      minuteList,
      val: {
        hour: ref(null),
        min: ref(null),
      },
    }
  },
  created(){
    if(this.sendValue) {
      const tim = this.sendValue.split(',');
      this.val.hour = tim[0];
      this.val.min = tim[1];
    }
  },
  methods:{
    setData() {
      this.$emit('selectValue', {
        value: this.val.hour + ',' + this.val.min,
        field: this.fieldName
      })

      if(this.sendDisplayField !== null) {
        this.$emit('selectValue', {
          value: this.val.hour * 60 +
              parseInt(this.val.min),
          field: this.sendDisplayField
        })
      }
    }
  }
}
</script>
<style lang="scss">
  // $
  @import '../../css/components/time-selector.scss';
  @import 'vue-scroll-picker/lib/style.css';
</style>

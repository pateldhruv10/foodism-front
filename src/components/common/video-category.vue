<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.vlog.fields.videoCategory.label }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="">
        <div class="ac-list">
          <div class="ac-box" v-for="item in val" :key="item">
            <q-checkbox v-model="model" :val="item">
              <div class="ac-info">
                <q-img src="~assets/c2.jpg"></q-img>
                <p>{{item}}</p>
              </div>
            </q-checkbox>
          </div>
        </div>
      </div>
      <div class="fixed-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn class="btn full-width btn1" label="Done" @click="setData()" />
      </div>
    </q-card-section>
  </div>
</template>

<script>
import { ref } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: 'dietCategory',
  props: {
    sendValue: {
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
    },
  },
  setup() {
    const route = useRoute()
    const slug = route.params.slug ?? null
    const store = useStore()
    const myPreview = store.getters['event/getvlogPreview']
    const vc = store.getters['event/getPreviewData']
    return {
      vc,
      slug,
      myPreview,
      model: ref([]),
      val: ['Food & Health','Food hacks','Food business','food photography','food presentation','food & travel']
    }
  },
  methods: {
    setData() {
      this.$emit('selectValue', {
        value: this.model,
        field: this.fieldName,
      })
      if (this.sendDisplayField !== null) {
        this.$emit('selectValue', {
          value: this.model.find((item) => item.value === this.model),
          field: this.sendDisplayField,
        })
      }
    //  this.model = this.vc
    },
  },
  created(){
    if(this.sendValue) {
      this.model = this.sendValue;
    }
    // if(this.slug){
    //   var selection = this.myPreview.find((item) => item.id == this.slug)
    //   console.log(selection);
    //   this.model = selection.video_category
    // }else{
    // }
  }
 }
</script>
<style lang="scss">
// $
</style>

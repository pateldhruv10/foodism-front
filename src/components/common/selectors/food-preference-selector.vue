<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.userProfile.edit.fields.foodPreference.label }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <!-- <q-card-section class="pop-body popup-fix-bottm">
      <div class="">
        <div class="ac-list">
          <div class="edit-cus-checkbox q-pt-lg">
            <q-radio size="lg" v-for="item in foodpreferences" :key="item.id" v-model="val" :val="item.id" :label="item.name" />
          </div>
        </div>
      </div>
      <div class="fixed-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn class="btn full-width btn1" label="Done" @click="setData()" />
      </div>
    </q-card-section> -->
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="">
        <div class="ac-list">
          <div class="ac-box" v-for="(item, index) in foodpreferences" :key="index">
            <!-- <q-checkbox v-model="val" :val="item.id">
              <div class="ac-info">
                <q-img src="~assets/c2.jpg"></q-img>
                <p>{{ item.name }}</p>
              </div>
            </q-checkbox> -->
            <q-radio size="lg" v-model="val" :val="item.id" :label="item.name" >
              <div class="ac-info">
                <q-img src="~assets/c2.jpg"></q-img>
                <p>{{ item.name }}</p>
              </div>
            </q-radio>
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
import {  ref } from 'vue';
import { useStore } from 'vuex'

export default {
  name: "FoodPreferenceSelector",
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
  setup () {
    const store = useStore();

    let foodpreferences = store.getters['master/getPreferredFood'];
    console.log(foodpreferences);
    if(!foodpreferences || foodpreferences.length === 0) {
      store.dispatch('master/getFoodPreference')
    }

    return {
      val: ref([]),
    }
  },
  created(){
    if(this.sendValue) {
      this.val = this.sendValue;
    }
    // if(this.sendValue) {
    //   this.val = this.sendValue.split(',').map(Number);
    // }
  },
  methods:{
    setData() {
      this.$emit('selectValue', {
        value: this.val,
        field: this.fieldName
      })

      if(this.sendDisplayField !== null) {
        this.$emit('selectValue', {
          value: this.foodpreferences.find(cuisine => cuisine.id === this.val).name,
          field: this.sendDisplayField
        })
      }
      // this.$emit('selectValue', {
      //   value: this.val,
      //   field: this.fieldName
      // })

      // if(this.sendDisplayField !== null) {
      //   this.$emit('selectValue', {
      //     value: this.val.map(item => this.foodpreferences.find(lang => lang.id == item).name).join(','),
      //     field: this.sendDisplayField
      //   })
      // }
    }
  },
  computed: {
    foodpreferences() {
      return this.$store.getters['master/getPreferredFood']
    }
  }
}
</script>

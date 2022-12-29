<template>
  <div class="select-cus-popup pref-lng">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.PopUpTitle.language }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="">
        <div class="ac-list">
          <div class="ac-box" v-for="(item, index) in languages" :key="index">
            <q-checkbox v-model="val" :val="item.id">
              <div class="ac-info">
                <q-img src="~assets/c2.jpg"></q-img>
                <p>{{ item.name }}</p>
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
import {  ref } from 'vue';
import { useStore } from 'vuex'

export default {
  name: "LanguageSelector",
  props: {
    sendValue : {
      type: String,
      default: null,
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

    let languages = store.getters['master/getLanguages'];
    console.log(languages);
    if(!languages || languages.length === 0) {
      store.dispatch('master/getLanguages');
    }

    return {
      val: ref([]),
    }
  },
  created(){
    if(this.sendValue) {
      this.val = this.sendValue;
    }
  },
  methods:{
    setData() {
      this.$emit('selectValue', {
        value: this.val,
        field: this.fieldName
      })

      if(this.sendDisplayField !== null) {
        this.$emit('selectValue', {
          value: this.val.map(item => this.languages.find(lang => lang.id == item).name).join(','),
          field: this.sendDisplayField
        })
      }
    }
  },
  computed: {
    languages() {
      return this.$store.getters['master/getLanguages']
    }
  }
}
</script>

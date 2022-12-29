<template>
  <div class="select-cus-popup pref-lng">
        <q-card-section class="row items-center pop-head">
          <h6>Categories</h6>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="pop-body popup-fix-bottm">
          
          <div class="">
            <div class="ac-list">
              <div class="ac-box">
                <q-checkbox v-model="val">
                  <div class="ac-info">
                    <q-img src="../../assets/c1.jpg"></q-img>
                    <p>Cat1</p>
                  </div>
                </q-checkbox>
              </div>
              <div class="ac-box">
                <q-checkbox v-model="val1">
                  <div class="ac-info">
                    <q-img src="~assets/c2.jpg"></q-img>
                    <p>Cat2</p>
                  </div>
                </q-checkbox>
              </div>
              <div class="ac-box">
                <q-checkbox v-model="val2">
                  <div class="ac-info">
                    <q-img src="~assets/c3.jpg"></q-img>
                    <p>Cat3</p>
                  </div>
                </q-checkbox>
              </div>
              <div class="ac-box">
                <q-checkbox v-model="val3">
                  <div class="ac-info">
                    <q-img src="~assets/c4.jpg"></q-img>
                    <p>Cat4</p>
                  </div>
                </q-checkbox>
              </div>
              
            
            </div>
            
          </div>
          <div class="fixed-bottom q-px-lg q-py-md box-shadow-cus">
            <q-btn class="btn full-width btn1" label="Done" />
          </div>
        </q-card-section>
      </div>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
export default {
  name: "CategoriesSelector",
  setup () {
    return {
      val: ref(false),
      val1: ref(false),
      val2: ref(false),
      val3: ref(false),

    }
  },
}
</script>

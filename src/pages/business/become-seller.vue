<template>
  <q-page class="become-seller q-pa-lg">
    <div class="bsp-top"><router-link :to="{ 'name': 'home' }"><i class="fas fa-arrow-left"></i></router-link></div>
    <div class="fixed-bottom bs-bottom">
      <div class="text-center bs-title q-pb-sm">
        <h4 class="q-pb-md"> {{ $q.lang.seller.becomeSeller.title }}</h4>
        <p v-html="$q.lang.seller.becomeSeller.description" />
      </div>
      <div class="bs-info q-pa-lg">
        <div class="bs-detail">
          <div class="bs-box" v-for="item in lists" :key="item.id">
            <div class="bs-icon">
              <q-img :src="item.image" :loading="eager" :decoding="async" :crossorigin="anonymous"></q-img>
            </div>
            <div class="bs-box-info">
              <p>{{ item.title }}</p>
              <span>{{ item.description }}</span>
            </div>
          </div>
        </div>
        <q-btn class="btn btn1 full-width" :label="$q.lang.seller.becomeSeller.createButton" :to=" { 'name': 'seller-form' }" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'BecomeSeller',
  setup () {
    const $q = useQuasar();
    const lists = [
      {
        id: 1,
        //title: "Let more people see your business",
        description: $q.lang.seller.becomeSeller.list.title1,
        image: require("../../assets/ic1.png"),
      },
      {
        id: 2,
        //title: "Let more people see your business",
        description: $q.lang.seller.becomeSeller.list.title2,
        image: require("../../assets/ic1.png"),
      },
      {
        id: 3,
        //title: "Let more people see your business",
        description: $q.lang.seller.becomeSeller.list.title3,
        image: require("../../assets/ic1.png"),
      },
      {
        id: 4,
        //title: "Let more people see your business",
        description: $q.lang.seller.becomeSeller.list.title4,
        image: require("../../assets/ic1.png"),
      },
    ];
    return {
      lists
    }
  },
})
</script>
<style lang="scss">
  // $
  @import '../../css/page/become-seller.scss';
</style>

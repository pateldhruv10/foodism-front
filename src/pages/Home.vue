<template>
  <q-page class="">
    <div class="mp-header">
      <div class="mp-head-left">
        <h5>{{ $q.lang.siteTitle }}</h5>
        <p class="location">
          <router-link to="/location">
            <span>Pratiksa Nagar, ahmedabad</span>
            <i class="las la-angle-down"></i>
          </router-link>
        </p>
      </div>
      <div class="mp-head-right">
        <div class="mp-profile">
          <router-link
            v-if="isLoggedIn"
            :to="{ name: 'profile-view', params: { slug: currentUser.id } }"
          >
            <div class="mp-profile-img">
              <q-img src="~assets/lg1.png"></q-img>
            </div>
          </router-link>
          <router-link v-if="!isLoggedIn" :to="{ name: 'index' }">
            <div class="mp-profile-img">
              <q-img src="~assets/lg1.png"></q-img>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <home-search />

    <!-- All Cuisine Start -->
    <div class="exp-cuis">
      <div class="title-tag">
        <h5>
          <span>{{ $q.lang.home.exploreCuisine }}</span>
        </h5>
        <see-all to="/allcuisines" />
      </div>
      <div class="cui-list">
        <cusine-card
          v-for="(cuisine, index) in cuisines"
          :key="index"
          :item="cuisine"
        />
      </div>
    </div>
    <!-- All Cuisine End -->

    <!-- Top Picks Start -->
    <div class="top-picks">
      <div class="title-tag">
        <h5>
          <span>{{ $q.lang.home.topPicks }}</span>
        </h5>
      </div>
      <div class="top-picks-list">
        <top-picks-card
          v-for="(item, index) in toppicks"
          :key="index"
          :item="item"
        />
      </div>
    </div>
    <!-- Top Picks Ends -->

    <!-- Popular Start -->
    <div class="p-seller">
      <div class="title-tag">
        <h5>
          <span>{{ $q.lang.home.popularSellers }}</span>
        </h5>
        <see-all to="/allseller" />
      </div>
      <div class="p-seller-list">
        <popular-seller-card
          v-for="(item, index) in popularsellers"
          :key="index"
          :item="item"
        />
      </div>
    </div>
    <!-- Popular Ends -->

    <!-- Coupans for Start -->
    <div class="coupons">
      <div class="title-tag">
        <h5><span>Coupons for you</span></h5>
        <see-all to="/allseller" />
      </div>
      <div class="coupon-list">
        <div class="row">
          <div class="col-4">
            <div class="coupon-box">
              <router-link to="">
                <q-img src="~assets/cp1.png"></q-img>
              </router-link>
            </div>
          </div>
          <div class="col-4">
            <div class="coupon-box">
              <router-link to="">
                <q-img src="~assets/cp2.png"></q-img>
              </router-link>
            </div>
          </div>
          <div class="col-4">
            <div class="coupon-box">
              <router-link to="">
                <q-img src="~assets/cp3.png"></q-img>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Coupans for Ends -->

    <!-- Explore by Occasions Start -->
    <div class="occasions">
      <div class="title-tag">
        <h5>
          <span>{{ $q.lang.home.byOccasions }}</span>
        </h5>
        <router-link to="/alloccasions">See All</router-link>
      </div>
      <div class="occasion-list">
        <occasions-box
          v-for="(item, index) in occasions"
          :key="index"
          :item="item"
        />
      </div>
    </div>
    <!-- Explore by Occasions Ends -->

    <!-- Polular food near Start -->
    <div class="near-food">
      <div class="title-tag">
        <h5>
          <span>{{ $q.lang.home.popularFood }}</span>
        </h5>
      </div>
      <div class="food-list flex">
        <food-box
          v-for="(item, index) in popularfoods"
          :key="index"
          :item="item"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  components: {
    'see-all': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "see-all" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/common/see-all.vue'
      )
    ),
    'home-search': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "home-search" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/home/search.vue'
      )
    ),
    'cusine-card': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "cusine-card" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/home/cuisine-card.vue'
      )
    ),
    'top-picks-card': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "top-picks-card" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/home/top-picks.vue'
      )
    ),
    'popular-seller-card': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "popular-seller-card" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/home/popular-seller-card.vue'
      )
    ),
    'food-box': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "food-box" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/home/food-box.vue'
      )
    ),
    'occasions-box': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "occasions-box" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/home/occasions-box.vue'
      )
    ),
  },
  computed: {
    ...mapGetters({
      cuisines: 'home/cuisines',
      toppicks: 'home/toppicks',
      popularsellers: 'home/popularsellers',
      occasions: 'home/occasions',
      popularfoods: 'home/popularfoods',
      isLoggedIn: 'auth/isLoggedIn',
    }),
  },
  setup() {
    const currentUser = computed(() => {
      return store.getters['auth/getUser']
    })
    return {
      currentUser,
    }
  },
}
</script>

<style lang="scss">
// $
@import '../css/index.scss';
@import '../css/page/login-signup.scss';
</style>

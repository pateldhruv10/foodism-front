<template>
  <q-page class="user-profile" v-if="!loaded">
    <header-with-backbutton :title="$q.lang.userProfile.view.title">
      <template #right>
        <router-link
          :to="{ name: 'user-edit', params: { slug: user.id } }"
          v-if="currentUser && currentUser.id == user.id"
        >
          {{ $q.lang.label.edit }}
        </router-link>
      </template>
    </header-with-backbutton>
    <div class="common-inner">
      <div class="user-img q-mb-lg">
        <q-carousel
          v-model="slide"
          :autoplay="autoplay"
          swipeable
          animated
          control-color="primary"
          navigation
          padding
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide
            v-for="(item, index) in images"
            :key="`Image${index}`"
            :name="index"
            :img-src="item"
          />
        </q-carousel>
      </div>

      <div class="db-name q-pa-lg text-center q-mb-lg">
        <h5 class="text-capitalize">{{ user?.name }}</h5>
        <p>{{ user.handler ? `@${user?.handler}` : '-' }}</p>
        <div class="follow-number">
          <div class="followers">
            <p>{{ followers.length || '0' }}</p>
            <span> {{ $q.lang.follow.subscriber }}</span>
          </div>
          <div class="following">
            <p>{{ following.length || '0' }}</p>
            <span> {{ $q.lang.follow.following }}</span>
          </div>
        </div>
      </div>
      <div class="db-about q-pa-lg text-center q-mb-lg">
        <p class="q-mb-sm">{{ $q.lang.userProfile.view.about }}</p>
        <span class="q-mx-md flex">{{
          user?.about ?? $q.lang.userProfile.view.noAbout
        }}</span>
      </div>

      <div
        class="db-parsonal q-pa-lg q-mb-lg"
       v-if="currentUser && currentUser.id == user.id"
      >
        <div>
          <p>{{ $q.lang.userProfile.view.mobile }}</p>
          <span>{{ user?.ph_number || '-' }}</span>
        </div>
        <div>
          <p>{{ $q.lang.userProfile.view.email }}</p>
          <span>{{ user?.email || '-' }}</span>
        </div>
      </div>
            <div
        class="db-parsonal q-pa-lg q-mb-lg"
        v-else-if="currentUser && currentUser.id != user.id  && user?.mobile_visibility == 1 || user?.email_visibility == 1"
      >
        <div v-if="user?.mobile_visibility == 1">
          <p>{{ $q.lang.userProfile.view.mobile }}</p>
          <span>{{ user?.ph_number || '-' }}</span>
        </div>
        <div v-if="user?.email_visibility == 1">
          <p>{{ $q.lang.userProfile.view.email }}</p>
          <span>{{ user?.email || '-' }}</span>
        </div>
      </div>
      <div class="db-info q-pa-lg q-mb-lg">
        <div>
          <p>{{ $q.lang.userProfile.view.city }}</p>
          <span> {{ user?.city_id?.name ?? getCity(user?.city_id) }}</span>
        </div>
        <div>
          <p>{{ $q.lang.userProfile.view.language }}</p>
          <span>{{ user?.language?.name }}</span>
        </div>
        <div>
          <p>{{ $q.lang.userProfile.view.gender }}</p>
          <span>{{ capitalize(user?.gender) }}</span>
        </div>
        <div>
          <p>{{ $q.lang.userProfile.view.dob }}</p>
          <span>{{ getDate(user?.date_of_birth) }}</span>
        </div>
      </div>
      <div class="db-food q-pa-lg q-mb-lg">
        <div class="food-prf q-pb-lg">
          <p>{{ $q.lang.userProfile.view.foodPreference }}</p>
          <span>{{ user?.foodPreference?.name }}</span>
        </div>
        <div class="cuisin-prf">
          <p>{{ $q.lang.userProfile.view.preferredCuisine }}</p>
          <span v-for="(item, index) in user?.cuisinePreference" :key="index">
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, defineAsyncComponent, computed } from 'vue'
import { mapGetters, useStore } from 'vuex'
import { getServerImageUrl } from '../../utils/server-asset'
import { DateTime } from 'luxon'
import { useRoute } from 'vue-router'
import { Loading } from 'quasar'

export default defineComponent({
  name: 'UserprofileIndex',
  setup() {
    const slide = ref(0)
    const store = useStore()
    const route = useRoute()
    const slug = route.params.slug ?? null
    const loaded = ref(false)
    Loading.show()
    const currentUser = computed(() => {
      return store.getters['auth/getUser']
    })
    const user = []
    const followers = []
    const following = []
    return {
      loaded,
      currentUser,
      user,
      followers,
      following,
      slide,
      slug,
      longText: ref(''),
    }
  },
  created() {
    this.$store.dispatch('auth/me').then(() => {
      Loading.hide()
      this.loaded = false
    })

    if (this.currentUser?.id != this?.slug) {
      this.user = computed(() => {
        return this.$store.getters['auth/getUserData']
      })
      this.followers = computed(() => {
        return this.$store.getters['auth/getUserFollowers']
      })
      this.following = computed(() => {
        return this.$store.getters['auth/getUserFollowing']
      })
    } else {
      console.log('current user')
      this.user = computed(() => {
        return this.$store.getters['auth/getUser']
      })
      this.followers = computed(() => {
        return this.$store.getters['auth/getFollowers']
      })
      this.following = computed(() => {
        return this.$store.getters['auth/getFollowing']
      })
    }
    if (!this.slug) {
      console.log('current user')
      this.user = computed(() => {
        return this.$store.getters['auth/getUser']
      })
      this.followers = computed(() => {
        return this.$store.getters['auth/getFollowers']
      })
      this.following = computed(() => {
        return this.$store.getters['auth/getFollowing']
      })
    }
  },
  components: {
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "common-header" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
  },
  computed: {
    ...mapGetters({
      city: 'master/getCities',
    }),
    images() {
      return this.user && this.user.images && this.user.images.length > 0
        ? this.user.images.map((item) => {
            return getServerImageUrl(item.image_path)
          })
        : [require('src/assets/default-user.jpg')]
    },
  },
  methods: {
    getDate(date) {
      return date !== null
        ? DateTime.fromISO(date).setLocale('en').toFormat('dd-MM-yyyy')
        : 'Not selected'
    },
    getCity(id) {
      return this.city.find((item) => item.id === id)?.name
    },
  },
})
</script>
<style lang="scss">
// $
@import '../../css/user-profile.scss';
</style>

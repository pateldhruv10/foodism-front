<template>
  <div class="ftr-center">
    <div @click="openNext()" class="pls-btn">
      <i class="las la-plus"></i>
    </div>
  </div>
  <q-tabs
    no-caps
    active-color="primary"
    indicator-color="transparent"
    class="text-grey"
    v-model="tab"
  >
    <q-tab
      name="home"
      @click="redirectToHome()"
      v-bind:class="{
        active: currentRouteName == 'home' || currentRouteName == 'user-home',
      }"
    >
      <q-img src="~assets/home.png"></q-img>
    </q-tab>
    <q-tab
      class="search-cus"
      name="search"
      @click="redirectToSearch()"
      v-bind:class="{ active: currentRouteName == 'search' }"
    >
      <q-img src="~assets/search.png"></q-img>
    </q-tab>
    <q-tab class="add-recipe" name="add">
      <i class="las la-plus"></i>
    </q-tab>

    <q-tab name="Marketplace" @click="redirectToComingsoon()"
      v-bind:class="{
        active:
          currentRouteName == 'coming-soon'
      }"
    >
      <q-img src="~assets/marketplace.png"></q-img>
    </q-tab>
    <q-tab
      name="Business Profile"
      @click="redirectToProfile()"
      v-bind:class="{
        active:
          currentRouteName == 'my-business-profile' ||
          currentRouteName == 'profile-view',
      }"
    >
      <q-img
        src="~assets/profile.png"
        @click="!isLoggedIn ? open('is-logout') : ''"
      ></q-img>
    </q-tab>
  </q-tabs>

  <q-dialog class="add-popup" v-model="useroption" position="bottom">
    <div class="cmn-flt">
      <q-card class="popup-cm">
        <q-card-section v-if="!secondDialog" class="pop-body">
          <div class="q-pa-lg text-center">
            <div class="add-btns">
              <q-btn
                class="btn btn-e q-mb-md"
                :to="{ name: 'host-events' }"
                :label="$q.lang.home.add.event"
              />
              <q-btn
                class="btn btn-r q-mb-md"
                :to="{ name: 'add-vlog' }"
                :label="$q.lang.home.add.vlog"
              />
              <q-btn
                class="btn btn-r"
                :to="{ name: 'written-recipe' }"
                :label="$q.lang.home.add.recipe"
              />
            </div>
          </div>
        </q-card-section>

        <div v-close-popup @click="secondDialog = false" class="pls-btn">
          <i class="las la-times"></i>
        </div>
      </q-card>
    </div>
  </q-dialog>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      :sendDisplayField="sendDisplayField"
      v-on:selectValue="setValue"
    ></component>
  </q-dialog>
</template>

<script>
import { defineAsyncComponent, ref, computed } from 'vue'
import { useStore, mapGetters } from 'vuex'
import useDialog from 'src/composable/useDialog'

export default {
  name: 'Footer',

  setup() {
    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()
    const useroption = ref(false)
    const store = useStore()
    const usertype = computed(() => store.getters['auth/getUserType'])
    const currentUser = computed(() => {
      return store.getters['auth/getUser']
    })
    return {
      currentUser,
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open,
      usertype,
      useroption,
      secondDialog: ref(false),
      isLoggedIn: computed(() => {
        return store.getters['auth/isLoggedIn']
      }),
    }
  },

  methods: {
    openNext() {
      if (!this.isLoggedIn) {
        return this.$router.push({ name: 'index' })
      } else {
        this.useroption = true
      }
    },
    redirectToVideo() {
      this.$router.push('/videos')
    },
    redirectToSearch() {
      this.$router.push('/search')
    },
    redirectToComingsoon() {
      this.$router.push('/coming-soon')
    },
    redirectToFeedbackform() {
      this.$router.push('/feedback-form')
    },
    redirectToHome() {
      if (this.usertype == 1) {
        this.$router.push({ name: 'user-home' })
      } else {
        this.$router.push({ name: 'home' })
      }
    },
    redirectToProfile() {
      if (this.usertype == 1) {
        if (this.isLoggedIn) {
          this.$router.push({
            name: 'profile-view',
            params: { slug: this.currentUser.id },
          })
        } else {
          return false
        }
      } else {
        this.$router.push({
          name: 'my-business-profile',
          params: { slug: this.currentUser.id },
        })
      }
    },
  },

  computed: {
    currentRouteName() {
      return this.$route.name
    },
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),
  },
}
</script>
<style lang="scss">
// $
@import '../../css/layout/footer-user.scss';
</style>

<template>
  <q-page v-if="loaded && event" class="event-detail">
    <div class="recipe-title-top fixed-top">
      <a href="javascript:history.go(-1)">
        <i class="fas fa-arrow-left"></i>
      </a>
      <h5>{{ event.name }}</h5>
    </div>
    <div class="ev-top">
      <user-head
        v-if="event && event.createdBy"
        :user="event.createdBy"
        :editLink="editLink"
        :deleteLink="deleteLink"
        :time="event.created_at"
      >
        <template v-slot:delete>
          <li
            v-if="
              event.createdBy && event.createdBy.id == user?.id && deleteLink
            "
            class="de-btn"
          >
            <q-btn
              class="text-capitalize"
              icon="delete"
              @click="deleteItem()"
            />
          </li>
        </template>
      </user-head>
    </div>

    <!-- {{ getSliderImage }} -->
    <div v-if="getSliderImage.length" class="he-img">
      <slider-image :images="getSliderImage" />
    </div>
    <div class="event-description">
      <!-- <div class="event-title q-my-sm">
        <h5>{{ event.name }}</h5>
      </div> -->
      <p class="detail-title q-pt-md">{{ $q.lang.event.show.date }}</p>

      <p v-if="event" class="q-pb-sm">{{ showDate }}</p>

      <p class="detail-title">{{ $q.lang.event.show.time }}</p>

      <p v-if="event" class="q-pb-sm">{{ showTime }}</p>

      <p class="detail-title">{{ $q.lang.event.show.language }}</p>

      <p v-if="event" class="q-pb-sm">
        {{ getLanguage(event.event_language) }}
      </p>

      <template v-if="event.event_type == 'Online'">
        <p class="detail-title">{{ $q.lang.event.show.link }}</p>
        <p class="q-pb-sm">
          <a :href="event.online_event_link"> {{ event.online_event_link }} </a>
        </p>
      </template>

      <template v-if="event.event_type == 'Offline'">
        <p class="detail-title">{{ $q.lang.event.show.address }}</p>
        <p class="q-pb-sm">
          {{ event.offline_event_address }}
          <br />
          {{ event?.city?.name }}
        </p>
      </template>

      <p class="detail-title">{{ $q.lang.event.show.description }}</p>

      <p class="q-pb-sm">{{ event.description }}</p>

      <p class="detail-title">{{ $q.lang.event.show.about }}</p>

      <p class="q-pb-sm">{{ event.about_host ?? 'No About' }}</p>

      <q-list>
        <q-expansion-item
          group="somegroup"
          :label="$q.lang.event.show.terms"
          header-class=""
        >
          <q-card>
            <q-card-section>
              {{ event.terms_condition ?? 'No Terms & Condition' }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
      <contest-bottom :isUserItem="event.user_id == user?.id" :item="event">
        <template v-slot:contest-bottom>
          <post-bottom>
            <template v-slot:left>
              <li
                @click="
                !isLoggedIn ? open('is-logout') :
                  open('share-popup', share)
                "
              >
                <img src="~assets/share.svg" />
              </li>
            </template>

            <template v-slot:right>
              <li v-if="event.user_id !== user?.id">
                <img
                  v-if="isBookmarked()"
                  src="~assets/bookmark-fill.svg"
                  @click="removeBookmark(event.id)"
                />
                <img
                  v-else
                  src="~assets/bookmark.svg"
                  @click="
                    !isLoggedIn
                      ? open('is-logout')
                      : bookmarkEvent(bookmarkData)
                  "
                />
              </li>
            </template>
          </post-bottom>
        </template>
      </contest-bottom>
    </div>
  </q-page>
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
import {
  defineComponent,
  defineAsyncComponent,
  computed,
  onBeforeMount,
  ref,
} from 'vue'
import { useRoute } from 'vue-router'
import { useStore, mapActions } from 'vuex'
import { getServerImageUrl } from '../../utils/server-asset'
import { DateTime, IANAZone } from 'luxon'
import useDialog from 'src/composable/useDialog'
import shareImage from 'src/composable/shareImage'
import api from 'src/apis/index'
import { Loading } from 'quasar'

export default defineComponent({
  name: 'EventDetail',
  components: {
    'contest-bottom': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "contest-bottom" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/common/contest-bottom.vue'
      )
    ),
    'post-bottom': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "post-bottom" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/common/post-bottom.vue'
      )
    ),
    'share-popup': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "share-popup" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/common/share-popup.vue'
      )
    ),
    'slider-image': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "slider-image" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/common/slider-image.vue'
      )
    ),
  },
  setup() {
    const store = useStore()
    store.commit('home/setEvent', [])
    const loaded = ref(false)

    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()
    const route = useRoute()
    const slug = route.params.slug

    Loading.show()
    store.dispatch('home/fetchEvent', slug).then(() => {
      Loading.hide()
      loaded.value = true
    })

    const event = computed(() => {
      return store.getters['home/getEvent']
    })

    const { getCoverImage, showImage, getImg } = shareImage()

    return {
      isLoggedIn: computed(() => {
        return store.getters['auth/isLoggedIn']
      }),
      loaded,
      event,
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      getCoverImage,
      showImage,
      getImg,
      user: computed(() => {
        return store.getters['auth/getUser']
      }),
      languages: computed(() => {
        return store.getters['master/getLanguages']
      }),
      getSliderImage: computed(() => {
        return store.getters['home/getEventGalleryImages'].map((it) =>
          getServerImageUrl(it.image)
        )
      }),
      share: computed(() => {
        return {
          type: 'event-details',
          title: event.value.name,
          images: getCoverImage(event.value.images),
          date: event.value.start_date,
          slug: event.value.slug,
        }
      }),
      bookmarkData: computed(() => {
        return {
          id: event.value.id,
          name: event.value.name,
          image:
            event.value.images &&
            event.value.images[0] &&
            event.value.images[0].image
              ? getImg(event.value.images[0].image)
              : null,
          slug: event.value.slug,
        }
      }),
      showDate: computed(() => {
        return event.value && event.value.start_date
          ? DateTime.fromISO(event.value.start_date)
              .setLocale('en')
              .toUTC()
              .toFormat('dd MMM yyyy') +
              ' - ' +
              DateTime.fromISO(event.value.end_date)
                .setLocale('en')
                .toUTC()
                .toFormat('dd MMM yyyy')
          : null
      }),
      showTime: computed(() => {
        return event.value && event.value.start_date
          ? DateTime.fromISO(event.value.start_date)
              .setLocale('en')
              .toUTC()
              .toLocaleString(DateTime.TIME_SIMPLE) +
              ' - ' +
              DateTime.fromISO(event.value.end_date)
                .setLocale('en')
                .toUTC()
                .toLocaleString(DateTime.TIME_SIMPLE)
          : null
      }),
    }
  },
  created() {
    const date1 = DateTime.now()
    const date2 = DateTime.fromISO(this.event.start_date)
    const diff = date1.diff(date2, ['hours'])
    console.log(this.event.name + ', ' + diff.hours)
    if (diff.hours > 48) {
      this.editLink = `/event/edit/${this.event.slug}`
      this.deleteLink = `/event/user/remove?event_id=${this.event.id}`
    }
  },
  methods: {
    isBookmarked() {
      const ev = this.$store.state.event.fev_events
      return ev.find((c) => c.id == this.event.id)
    },
    ...mapActions('event', ['bookmarkEvent', 'removeBookmark']),
    getLanguage(id) {
      return this.languages.find((it) => it.id == id)?.name
    },
  },
})
</script>
<style lang="scss">
// $
@import 'src/css/components/host-event-cards.scss';
</style>

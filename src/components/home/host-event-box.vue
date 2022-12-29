<template>
  <div class="he-box">
    <div class="he-card">
      <div class="he-top">
        <user-head
          :user="item.createdBy"
          :editLink="editLink"
          :deleteLink="deleteLink"
          :time="item.created_at"
        >
          <template v-slot:delete>
            <li
              v-if="
                user &&
                item.createdBy &&
                item.createdBy.id == user.id &&
                deleteLink
              "
              class="de-btn float-right"
            >
              <q-btn
                class="text-capitalize float-right"
                icon="delete"
                @click="deleteItem()"
              />
            </li>
          </template>
        </user-head>
      </div>
      <div class="he-img">
        <router-link
          :to="{ name: 'event-details', params: { slug: item.slug } }"
        >
          <slider-image
            :images="getGalleryImages(item.images)"
            :redirectUrl="{
              name: 'event-details',
              params: { slug: item.slug },
            }"
          />
        </router-link>
      </div>
      <div class="he-dis">
        <div class="he-title q-mt-sm">
          <h5>
            <router-link
              :to="{ name: 'event-details', params: { slug: item.slug } }"
            >
              {{ item.name }}
            </router-link>
          </h5>
        </div>

        <div class="he-date q-py-sm">
          <router-link
            :to="{ name: 'event-details', params: { slug: item.slug } }"
          >
            <i class="las la-calendar"></i>{{ showDate }}
          </router-link>
        </div>

        <div class="he-time q-pb-sm">
          <router-link
            :to="{ name: 'event-details', params: { slug: item.slug } }"
          >
            <i class="las la-clock"></i> {{ showTime }}
          </router-link>
        </div>

        <div class="he-time q-pb-md" v-if="item.event_type == 'Online'">
          <router-link

            :to="{ name: 'event-details', params: { slug: item.slug } }"
          >
            <i class="las la-globe"></i>
            <span class="ellipsis-2-lines">
              Online
            </span>
          </router-link>
        </div>
        <!-- {{ item.online_event_link }} -->
        <div class="he-time q-pb-md" v-if="item.event_type == 'Offline'">
          <router-link
            :to="{ name: 'event-details', params: { slug: item.slug } }"
          >
            <i class="las la-map-marker"></i>
            <span class="ellipsis-3-lines">
              {{ getCity(item.city_id) }}
            </span>
          </router-link>
        </div>

        <contest-bottom
          :isUserItem="user && item.user_id == user.id"
          :item="item"
        >
          <template v-slot:contest-bottom>
            <post-bottom>
              <template v-slot:left>
                <li
                  @click=" !isLoggedIn ? open('is-logout') :
                   open('share-popup', share)
                  "
                >
                  <img src="~assets/share.svg" />
                </li>
              </template>

              <template v-slot:right>
                <li v-if="user && item.user_id !== user.id">
                  <img
                    v-if="isBookmarked()"
                    src="~assets/bookmark-fill.svg"
                    @click="removeBookmark(item.id)"
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
    </div>
  </div>

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
import shareImage from 'src/composable/shareImage'
import { ref, defineAsyncComponent, computed } from 'vue'
import { DateTime } from 'luxon'
import { mapActions,mapGetters, useStore } from 'vuex'
import useDialog from 'src/composable/useDialog'
import useDate from 'src/composable/useDate'
import { api } from 'src/boot/axios'
import Notify from 'src/boot/notification'

export default {
  name: 'EventCardBox',
  props: {
    item: {
      type: Object,
      required: true,
    },
    tab: {
      type: Object,
      required: true,
    },

  },
  setup(props) {
    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()

    const { getDiffInHour } = useDate()

    const { getImg, getGalleryImages } = shareImage()
    const store = useStore()
    const readMoreActivated = ref(false)
    const showReadMore = ref(false)
    const longText = ref(props.item.description)

    if (longText.value.length > 130) {
      showReadMore.value = true
    }

    return {
      event: computed(() => {
        return store.getters['home/getEvent']
      }),
      isLoggedIn: computed(() => {
        return store.getters['auth/isLoggedIn']
      }),
      participateDisabled: ref(true),
      getGalleryImages,
      bookmarkData: computed(() => {
        return {
          id: props.item.id,
          name: props.item.name,
          image:
            props.item.images && props.item.images[0]
              ? getImg(props.item.images[0])
              : null,
          slug: props.item.slug,
        }
      }),
      share: computed(() => {
        return {
          type: 'event-details',
          title: props.item.name,
          images: props.item?.images[0],
          date: props.item.start_date,
          slug: props.item.slug,
        }
      }),
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      getDiffInHour,
      user: computed(() => {
        return store.getters['auth/getUser']
      }),
      bookmark: '',
      showReadMore,
      longText,
      readMoreActivated,
      activateReadMore() {
        readMoreActivated.value = true
      },
      deactivateReadMore() {
        readMoreActivated.value = false
      },
      deleteLink: ref(null),
    }
  },
  components: {
    'contest-bottom': defineAsyncComponent(() =>
      import('components/common/contest-bottom.vue')
    ),
    'post-bottom': defineAsyncComponent(() =>
      import('components/common/post-bottom.vue')
    ),
    'share-popup': defineAsyncComponent(() =>
      import('../../components/common/share-popup.vue')
    ),
    'slider-image': defineAsyncComponent(() =>
      import('src/components/common/slider-image.vue')
    ),
  },
  created() {
    this.event = this.$store.getters['home/getEvent']

    if (this.getDiffInHour(this.item.start_date) > 48) {
      this.editLink = `/event/edit/${this.item.slug}`
      this.deleteLink = `/event/user/remove?event_id=${this.item.id}`
    }
  },
  methods: {
    ...mapActions('event', ['bookmarkEvent', 'removeBookmark']),
    deleteItem() {
      api
        .delete(this.deleteLink)
        .then((res) => {
          if (res.data.success || res.status == 200) {
            this.$store.dispatch('home/removeEvent', this.item.id)
            Notify.success(res.data.message)
          } else {
            Notify.error(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    isBookmarked() {
      const ev = this.$store.state.event.fev_events
      // console.log(ev.find((c) => c.id == this.item.id))
      return ev.find((c) => c.id == this.item.id)
    },
    getCity(id) {
      return this.city.find((item) => item.id === id)?.name
    },
  },
  computed: {
     ...mapGetters({
      city: 'master/getCities'
    }),
    showDate() {
      return (
        DateTime.fromISO(this.item.start_date)
          .setLocale('en')
          .toUTC()
          .toFormat('dd MMM yyyy') +
        ' - ' +
        DateTime.fromISO(this.item.end_date)
          .setLocale('en')
          .toUTC()
          .toFormat('dd MMM yyyy')
      )
    },
    showTime() {
      return (
        DateTime.fromISO(this.item.start_date)
          .setLocale('en')
          .toUTC()
          .toLocaleString(DateTime.TIME_SIMPLE) +
        ' - ' +
        DateTime.fromISO(this.item.end_date)
          .setLocale('en')
          .toUTC()
          .toLocaleString(DateTime.TIME_SIMPLE)
      )
    },
  },
}
</script>
<style lang="scss">
// $
@import '../../css/components/host-event-cards.scss';
.dis {
  color: red;
}
.reaction-box {
    display: flex !important;
}
</style>

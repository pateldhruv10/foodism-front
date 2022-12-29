<template>
  <q-page class="">
    <div class="event-page event-detail-page" v-if="getEventData[0]">
      <div class="banner-cus">
        <q-img src="~assets/images/event-bg.jpg"></q-img>
        <div class="banner-content">
          <h2>{{ getEventData[0].name }}</h2>
        </div>
      </div>
    <!-- <div class="event-bnr" style="background: url('assets/images/event1.jpg') center;">
      <div class="event-content">
        <h2>The Good Food Festival (Event Name 123)</h2>
      </div>
    </div> -->
    <div class="event-detail-dis">
      <div class="event-box">
        <div class="event-head">
          <div class="user-img">
            <q-img :src="getEventData[1]"></q-img>
          </div>
          <div class="user-details">
            <p class="user-name"  v-if="getEventData[0].createdBy">{{getEventData[0].createdBy.name}}</p>
            <p class="post-time">{{getHumanReadable(getEventData[0].created_at)}}</p>
          </div>
        </div>
        <div class="event-img">
          <q-img :src="getEventImage(getEventData[0].images[0].image)"></q-img>
        </div>
        <div class="event-details">
          <h3>{{ getEventData[0].name }}</h3>
          <div class="mb-3">
            <p class="ev-dt-title">Event Date</p>
            <p>{{showDate(getEventData[0].start_date,getEventData[0].end_date)}}</p>
          </div>
          <div class="mb-3">
            <p class="ev-dt-title">Event Time</p>
            <p>{{showTime(getEventData[0].start_date,getEventData[0].end_date)}}</p>
          </div>
          <div class="mb-3">
            <p class="ev-dt-title">Event Language</p>
            <p>{{ getLanguage(getEventData[0].event_language) }}</p>
          </div>
          <div class="mb-3" v-if="getEventData[0].event_type == 'Offline'">
            <p class="ev-dt-title">Event Address</p>
            <p>{{ getCity(getEventData[0].city_id) }}</p>
          </div>
          <div class="mb-3" v-if="getEventData[0].event_type == 'Online'">
            <p class="ev-dt-title">Event Link</p>
            <p class="ev-link"><a :href="getEventData[0].online_event_link" class="ev-link">{{getEventData[0].online_event_link}}</a></p>
          </div>
          <div class="mb-3">
            <p class="ev-dt-title">Description</p>
            <p>{{getEventData[0].description}}</p>
          </div>
          <div class="mb-3">
            <p class="ev-dt-title">About Host</p>
            <p>{{getEventData[0].about_host}}</p>
          </div>
          <!-- <div class="mb-3">
            <p class="ev-dt-title">About Host</p>
            <p>Reveal My Food software and digital menu for allergens management Reveal My Food UK's leading omnichannel for the hospitality market. Enables multi-site restaurants, hotels, pubs & bars and food-to-go establishments to comply with Natashas' allergens management law.</p>
          </div> -->
          <div class="accordion">
            <q-list>
              <q-expansion-item group="somegroup" label="Host Terms & Conditions">
                <q-card>
                  <q-card-section>
                    {{getEventData[0].terms_condition}}
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>

          <!-- <p><button class="btn btn2">Participate Now</button></p> -->
        </div>
      </div>
    </div>

  </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref, computed } from 'vue';
import api from '../../apis/index';
import { DateTime } from 'luxon';
import { mapActions,mapGetters, useStore } from 'vuex'
import { useRoute } from 'vue-router'


export default ({
  name: 'WebEventDetail',
  setup () {
    const store = useStore()
    return {
      current: ref(3),
      languages: computed(() => {
        return store.getters['master/getLanguages']
      }),
    }
  },
  data(){
    return{
      getEventData:[],
    }
  },
  computed: {
     ...mapGetters({
      city: 'master/getCities'
    }),
  },
  methods: {
    getCity(id) {
      return this.city.find((item) => item.id === id)?.name
    },
    getLanguage(id) {
      return this.languages.find((it) => it.id == id)?.name
    },
    getEvent () {
      // var getEventData = [];
      const route = useRoute()
    const slug = route.params.slug
      api.get('/event/'+slug).then(res => {
        this.getEventData.push(res.data);
        this.getEventData.push(res.user_image);
           console.log(this.getEventData[0]);


        // console.log(res.data.data.length);
      //  resolve(res)
    }).catch(err => {
      console.log(err);
      reject(err)
    });
    },
    getEventImage(img){
      console.log();
      return (
        process.env.ASSET_URL+img
      )
    },
    showDate(from,to) {
      return (
        DateTime.fromISO(from)
          .setLocale('en')
          .toUTC()
          .toFormat('dd MMM yyyy') +
        ' - ' +
        DateTime.fromISO(to)
          .setLocale('en')
          .toUTC()
          .toFormat('dd MMM yyyy')
      )
    },
    showTime(from,to) {
      return (
        DateTime.fromISO(from)
          .setLocale('en')
          .toUTC()
          .toLocaleString(DateTime.TIME_SIMPLE) +
        ' - ' +
        DateTime.fromISO(to)
          .setLocale('en')
          .toUTC()
          .toLocaleString(DateTime.TIME_SIMPLE)
      )
    },
  },
  created () {
    this.getEvent();
    console.log(this.getEventData);
  }
})
</script>

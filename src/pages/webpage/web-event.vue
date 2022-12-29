<template>
  <q-page class="">
    <div class="event-page">
      <div class="search-section">
        <q-img src="~assets/images/event-bg.jpg"></q-img>
        <div class="search-content">
          <h1>Events</h1>
          <p>Explore fun activites</p>
          <div class="search-box">
            <!-- <p>We are here to support you & provide the best experience</p> -->
            <div class="flex">
              <input type="text" placeholder="Search keyword"><button class="btn btn2"><q-img src="~assets/images/search.png"></q-img></button>
            </div>
          </div>
        </div>
      </div>

      <div class="event-sec">
        <div class="container">


          <div class="event-listing">
            <q-card>
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="upevent" label="Upcoming Events" />
                <q-tab name="ongevent" label="Ongoing Events" />
              </q-tabs>

              <q-separator />
              <!-- {{ getEventData }} -->
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="upevent">
                  <div class="row q-col-gutter-lg">
                    <div class="col-md-6 col-lg-4 col-12" v-for="n in getEventData.length" :key="`none-${n}`">
                      <div class="event-box" v-if="getEventData[n-1].start_date !== Date.now()">
                        <div class="event-head">
                          <a href="login">
                            <div class="user-img">
                              <q-img :src="getEventData[n-1].userimage"></q-img>
                            </div>
                            <div class="user-details">
                              <p class="user-name">{{getEventData[n-1].createdBy.name}}</p>
                              <p class="post-time">{{getHumanReadable(getEventData[n-1].created_at)}}</p>
                            </div>
                          </a>
                        </div>
                        <div class="event-img">
                          <router-link :to="{ name: 'web-event-detail', params: { slug: getEventData[n-1].slug } }">
                            <q-img :src="getEventImage(getEventData[n-1].images[0])"></q-img>
                          </router-link>
                        </div>
                        <div class="event-details">
                          <router-link :to="{ name: 'web-event-detail' , params: { slug: getEventData[n-1].slug }}">
                            <h3>{{getEventData[n-1].name}}</h3>
                            <p><i class="far fa-calendar-alt"></i> {{showDate(getEventData[n-1].start_date,getEventData[n-1].end_date)}}</p>
                            <p><i class="far fa-clock"></i> {{showTime(getEventData[n-1].start_date,getEventData[n-1].end_date)}}</p>
                            <p v-if="getEventData[n-1].event_type == 'Offline'"><i><q-img src="~assets/images/add.png"></q-img></i> {{ getCity(getEventData[n-1].city_id) }}</p>
                            <p class="ev-link" v-if="getEventData[n-1].event_type == 'Online'">
                              <i><q-img src="~assets/images/online-event.svg"></q-img></i> {{getEventData[n-1].online_event_link}}</p>
                            <p class="ev-dis">{{getEventData[n-1].description}}</p>
                          </router-link>
                          <!-- <p><q-btn href="login" class="btn btn1">Intrested ?</q-btn></p> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="ongevent">
                  <div class="row q-col-gutter-lg">
                    <div class="col-md-6 col-lg-4 col-12" v-for="n in getEventData.length" :key="`none-${n}`">
                      <div class="event-box">
                        <div class="event-head">
                          <a href="login">
                            <div class="user-img">
                              <q-img :src="getEventData[n-1].userimage"></q-img>
                            </div>
                            <div class="user-details">
                              <p class="user-name">{{getEventData[n-1].createdBy.name}}</p>
                              <p class="post-time">{{getHumanReadable(getEventData[n-1].created_at)}}</p>
                            </div>
                          </a>
                        </div>
                        <div class="event-img">
                          <router-link :to="{ name: 'web-event-detail', params: { slug: getEventData[n-1].slug } }">
                            <q-img :src="getEventImage(getEventData[n-1].images[0])"></q-img>
                          </router-link>
                        </div>
                        <div class="event-details">
                          <router-link :to="{ name: 'web-event-detail' , params: { slug: getEventData[n-1].slug }}">
                            <h3>{{getEventData[n-1].name}}</h3>
                            <p><i class="far fa-calendar-alt"></i> {{showDate(getEventData[n-1].start_date,getEventData[n-1].end_date)}}</p>
                            <p><i class="far fa-clock"></i> {{showTime(getEventData[n-1].start_date,getEventData[n-1].end_date)}}</p>
                            <p v-if="getEventData[n-1].event_type == 'Offline'"><i><q-img src="~assets/images/add.png"></q-img></i> {{ getCity(getEventData[n-1].city_id) }}</p>
                            <p class="ev-link" v-if="getEventData[n-1].event_type == 'Online'"><i><q-img src="~assets/images/web.png"></q-img></i> {{getEventData[n-1].online_event_link}}</p>
                            <p class="ev-dis">{{getEventData[n-1].description}}</p>
                          </router-link>
                          <!-- <p><q-btn href="login" class="btn btn1">Intrested ?</q-btn></p> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>


            <!-- <div class="text-center q-mt-xl">
              <q-btn href="#" class="btn btn2">View More</q-btn>
            </div> -->


          </div>
        </div>

      </div>

    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';
import api from '../../apis/index';
import { DateTime } from 'luxon';
import { mapActions,mapGetters, useStore } from 'vuex'

export default ({
  name: 'WebEvent',

  setup () {
    return {
      tab: ref('upevent'),
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
    getEvent () {
      // var getEventData = [];
      api.get('/event/list?limit=20').then(res => {
        for(var i in res.data.data) {
          this.getEventData.push(res.data.data[i]);
          // console.log(res.data.data[i]);
          // console.log(this.getEventData.length);
        }


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

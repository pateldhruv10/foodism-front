 <template>
  <q-page class="notification head-fix">
    <header-with-backbutton title="Notification" extraClass="fixed-top" />

    <div class="common-inner">
      <div class="noti-list">
        <div class="noti-box not-seen">
          <router-link to="">
            <div class="noti-left">
              <div class="default-profile-img">
                <q-img src="~assets/pr-pic.svg"></q-img>
              </div>
            </div>
            <div class="noti-right">
              <div class="noti-dis"><b>Sangeeta davara</b> participeted in your event</div>
              <div class="time">15 m </div>
            </div>
          </router-link>
        </div>
        <div class="noti-box">
          <router-link to="">
            <div class="noti-left">
              <div class="default-profile-img">
                <q-img src="~assets/pr-pic.svg"></q-img>
              </div>
            </div>
            <div class="noti-right">
              <div class="noti-dis"><b>Sangeeta davara</b> participeted in your event</div>
              <div class="time">15 m </div>
            </div>
          </router-link>
        </div>
        <div class="noti-box not-seen">
          <router-link to="">
            <div class="noti-left">
              <div class="default-profile-img">
                <q-img src="~assets/pr-pic.svg"></q-img>
              </div>
            </div>
            <div class="noti-right">
              <div class="noti-dis"><b>Sangeeta davara</b> participeted in your event</div>
              <div class="time">15 m </div>
            </div>
          </router-link>
        </div>
        <div class="noti-box">
          <router-link to="">
            <div class="noti-left">
              <div class="default-profile-img">
                <q-img src="~assets/pr-pic.svg"></q-img>
              </div>
            </div>
            <div class="noti-right">
              <div class="noti-dis"><b>Sangeeta davara</b> participeted in your event</div>
              <div class="time">15 m </div>
            </div>
          </router-link>
        </div>
        <div class="noti-box">
          <router-link to="">
            <div class="noti-left">
              <div class="default-profile-img">
                <q-img src="~assets/pr-pic.svg"></q-img>
              </div>
            </div>
            <div class="noti-right">
              <div class="noti-dis"><b>Sangeeta davara</b> participeted in your event</div>
              <div class="time">15 m </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed , defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'RewardsIndex',
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
  setup () {

  }
})
</script>
<style lang="scss">
  // $
  @import '../../css/notification.scss';
</style>

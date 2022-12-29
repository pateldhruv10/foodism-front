<template>
  <q-page class="">
    <div class="help-center">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <div class="fixed-left">
              <ul class="sidebar-nav">
                  <!-- <li class="nav-item active">
                    <button @click="goto('community_guidelines')">Community Guidelines</button>
                  </li>
                  <li class="nav-item">
                    <button @click="goto('privacy_policy')">Privacy Policy</button>
                  </li>
                  <li class="nav-item">
                    <button @click="goto('terms&condition')">Terms & Condition</button>
                  </li>
                  <li class="nav-item">
                      <button @click="goto('event_policy')">Event Policy </button>
                  </li>
                  <li class="nav-item">
                    <button @click="goto('cookies_policy')">Cookies Policy </button>
                </li> -->
                <li><router-link :to="{ name: 'community-guideline' }">Community Guidelines</router-link></li>
                <li><router-link :to="{ name: 'pricacy' }">Privacy Policy</router-link></li>
                <li><router-link :to="{ name: 'terms-and-condition' }">Terms & Condition</router-link></li>
                <li><router-link :to="{ name: 'event-policy' }">Event Policy</router-link></li>
                <li class="active"><router-link :to="{ name: 'cookies-policy' }">Cookies Policy</router-link></li>

              </ul>
            </div>
          </div>
          <div class="col-md-9 right-content">
            <section class="" id="five" ref="cookies_policy">
              <div class="pt-5">
                <h2 class="h1 mb-4">Cookies Policy</h2>
                <p><b>Here you will find Foodism's Cookies Policy. In case of any questions, don't hesitate to contact us.</b></p>
                <div class="mb-5 mt-5">
                  <p>This Website uses cookies or similar electronic tools to distinguish you from other users of our website as well as to improve the responsiveness of the sites for the users.</p>
                  <p>A cookie is a string of information. A small data file is transferred to a device that recognizes and identifies the user and allows the user’s device to remember information from the Website for future use.</p>
                  <p>Each user is assigned a unique User Identification (User ID) to understand the user’s interests. It is mainly used to understand how the Website is used by its users in order to enhance website performance and improve user experience in browsing the Website and availing of our services. This also helps to analyze what a website stores on a user’s computer and to see how users move around the website when they are using it.</p>
                  <p>We use cookies to help us identify and track visitors and/or users, usage of the Website and Website access preferences.</p>
                  <p>Further, the pages on the website may also include web beacons or pixels, which are electronic files to count users who have visited that page, to track activity over time and across different websites, to determine users’ interactions with emails we send. This helps to identify certain cookies on the computer or other electronic device accessing that page or to collect other related information, and this information may be associated with your unique browser, device identifier, or Internet Protocol address.</p>
                  <p>We may, for example, implement a pixel on the pages of the Services where you view a certain advertisement so that we can track whether you visit a website associated with that advertisement at a later time.</p>
                  <p>Cookies inherently do not contain any information that personally identifies the users. However, the Website may collect technical information from a user’s mobile device/computer or any electronic device or user’s use of the services through any device, for example, location data and certain characteristics of, and performance data about the device, carrier/operating system including device and connection type, IP address, pages a user has visited, links followed, mobile payment modes etc.</p>
                  <p>Cookies may be of many types including Performance Cookies, Functionality Cookies, Targeting and/or Advertising Cookies. We may also share the information received from these cookies with third parties/partners for advertisement and promotional purposes to make our website and the information/advertisements therein relevant to a user’s interests. Similarly, our partners may use cookies, attribution services or other similar technology to determine whether we've served an ad and how it performed or provide us with information about how users interact with them. Please note that our advertisers may also use cookies in different manners, over which we have no control and hold no liability for any usage by them in any manner.</p>
                  <p>Users are provided with a choice to not have cookies placed on their computers/devices by activating the setting on your browser which allows you to refuse cookies. Accordingly, such users may set their browsers to refuse cookies before using the Website, with the drawback that certain features of our Website may not function properly due to the disablement of cookies. By continuing to browse the site, it is implied that you agree to our use of cookies.</p>
                  <p>You can find more detailed information about cookies and how they work at <a href="https://www.aboutcookies.org"> https://www.aboutcookies.org </a> to see what cookies have been set and how to manage and delete them.</p>
                  <p>We reserve the right to modify this policy at any time. Any changes we may make to our policy in the future will be notified and made available to you while using the services/Website. Your continued use of the services and the Website shall be deemed your acceptance of the varied policy.</p>

                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'

export default defineComponent({
  name: 'Privacy',
  setup () {
    return {
    }
  },
  methods: {
    goto(refName) {
    	var element = this.$refs[refName];
      console.log(element);
      var top = element.offsetTop;

      window.scrollTo(0, top);
    }
  }
})
</script>

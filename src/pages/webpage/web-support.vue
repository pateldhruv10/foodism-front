<template>
  <q-page class="">
    <div class="search-section">
      <q-img src="~assets/images/support-bg.jpg"></q-img>
      <div class="search-content">
        <h1>Ask Us Anything</h1>
        <div class="search-box">
          <p>We are here to support you & provide the best experience</p>
          <div class="flex">
            <input type="text" placeholder="Search keyword"><button class="btn btn2"><q-img src="~assets/images/search.png"></q-img></button>
          </div>
        </div>
      </div>
    </div>
    <div class="sup-sec">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-sm-4 col-12">
            <div class="sup-box" @click="contactpoup = true">
              <q-img src="~assets/images/support.png"></q-img>
              <h4>Support</h4>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 col-12">
            <router-link :to="{ name: 'web-faq' }">
              <div class="sup-box">
                <q-img src="~assets/images/faq.png"></q-img>
                <h4>FAQ</h4>
              </div>
            </router-link>
          </div>
          <div class="col-md-4 col-sm-4 col-12">
            <router-link :to="{ name: 'web-faq-video' }">
              <div class="sup-box">
                <q-img src="~assets/images/FAQ-videos.png"></q-img>
                <h4>FAQ Videos</h4>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-sec">
      <div class="container">
        <div class="row fw q-pt-xl q-pb-xl">
          <div class="col-md-4 col-sm-4 col-12">
              <div class="contact-box">
                  <q-img src="~assets/images/location.png"></q-img>
                  <div class="contact-detail">
                      <h6>Our Office</h6>
                      <p> Foodism, 601, Sarap - Nr Income Tax, opp. Navjivan Press, Ahmedabad, Gujarat 380014</p>
                  </div>
              </div>
          </div>
          <div class="col-md-4 col-sm-4 col-12">
              <div class="contact-box">
                  <q-img src="~assets/images/phone.png"></q-img>
                  <div class="contact-detail">
                      <h6>Phone Number</h6>
                      <p><a href="tel:+91 6359666000">+91 6359666000</a></p>
                      <p><a href="tel:+91 6959111000">+91 6959111000</a></p>
                  </div>
              </div>
          </div>
          <div class="col-md-4 col-sm-4 col-12">
              <div class="contact-box">
                  <q-img src="~assets/images/email.png"></q-img>
                  <div class="contact-detail">
                      <h6>Email</h6>
                      <p><a href="mailto:help@foodism.xyz">help@foodism.xyz</a></p>
                      <p><a href="mailto:support@foodism.xyz">support@foodism.xyz</a></p>
                  </div>
              </div>
          </div>
        </div>
        <div class="row fw">


          <div class="col-md-6">
              <!-- <form class="fw" id="form" action="" accept-charset="UTF-8" method="">
                  <div class="row fw">
                      <div class="col-md-12">
                          <h4><b>Get a free Inquiries</b></h4>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-6">
                          <div class="form-group">
                              <input type="text"class="form-control" id="first-name" placeholder="First Name">

                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                              <input type="text" class="form-control" id="last-name" placeholder="Last Name">

                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-12">
                          <div class="form-group">
                              <input type="email" class="form-control" id="email" placeholder="Enter Your Email id">

                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-12">
                          <div class="form-group">
                              <textarea type="text" class="form-control" placeholder="Enter your message"></textarea>

                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-12">
                          <button type="submit" class="btn btn2">Submit</button>
                      </div>
                  </div>
              </form>  -->


          </div>
          <div class="col-md-12">
              <div class="row fw">
                  <div class="col-md-12">
                      <!-- <h4><b>We are here</b></h4> -->
                  </div>
                  <div class="col-md-12">
                    <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.478747787672!2d72.56484005119438!3d23.042903521274894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85243f63c379%3A0x54396ce7c06e95c1!2sFoodism.xyz%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1659385023169!5m2!1sen!2sin" width="100%" height="310" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> -->
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="map-location">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.478747787672!2d72.56484005119438!3d23.042903521274894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85243f63c379%3A0x54396ce7c06e95c1!2sFoodism.xyz%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1659385023169!5m2!1sen!2sin" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <q-dialog v-model="contactpoup" class="web-center-popup">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Submit your inquiry here</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="row">
            <div class="col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <q-input v-model="text" label="First Name" />
              </div>
            </div>
            <div class="col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <q-input v-model="text" label="Last Name" />
              </div>
            </div>
            <div class="col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <q-input v-model="text" label="Enter your email id" />
              </div>
            </div>
            <div class="col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <q-input
                  v-model="text"
                  type="textarea"
                  label="Enter your message"
                />

              </div>
            </div>
            <div class="col-md-12 col-sm-12 col-12">
              <q-btn class="btn btn1">Submit</q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'

export default defineComponent({
  name: 'WebSupport',
  setup () {
    return {
      current: ref(3),
      contactpoup:ref(false),
    }
  },
})
</script>

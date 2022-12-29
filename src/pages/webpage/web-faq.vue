<template>
  <q-page class="">
    <div class="about-us faq-section" >
      <div class="banner-cus">
        <q-img src="~assets/images/faq1.jpg"></q-img>
        <div class="banner-content">
          <h2>Frequently Asked Questions</h2>
        </div>
      </div>
      <div class="q-py-xl">
        <div class="container">
          <div class="accordion" id="accordionExample">
            <q-list class="">
            <q-expansion-item
              group="somegroup"
              label="1)  How to Sign up?"
              default-opened
            >
              <q-card>
                <q-card-section>
                  Please refer to this <a href="#" data-bs-toggle="modal" data-bs-target="#signup">Video</a> for stepwise instructions on how to sign up.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item group="somegroup" label="2)  How to upload my recipe?">
              <q-card>
                <q-card-section>
                  Please refer to this <a href="#" data-bs-toggle="modal" data-bs-target="#recipeupload">Video</a> for stepwise instructions on how to upload recipes.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item group="somegroup" label="3)  Can I upload a recipe without registration?" >
              <q-card>
                <q-card-section>
                  You must become an active user and register to submit your recipes.
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item group="somegroup" label="4)  What are the guidelines for content submission?" >
              <q-card>
                <q-card-section>

                  <ul>
                    <li>All content must be original and non-plagiarised.</li>
                    <li>The Images/videos must be original and not sourced from other websites.</li>
                    <li>The content should follow community guidelines.</li>
                    <li>Reposting or resharing another user’s content is not allowed on the application.</li>
                  </ul>
                  <p>For more information, please go through our <a href="https://foodism.xyz/terms">terms and conditions.</a></p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item group="somegroup" label="5)  My content is being used without permission, what can I do?" >
              <q-card>
                <q-card-section>
                  We care for our user’s privacy and encourage you to report any such activity immediately. You can trust us to take the necessary action immediately.
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item group="somegroup" label="6)  How do I share my recipe on other platforms" >
              <q-card>
                <q-card-section>
                  You can share your recipe by simply clicking on the share icon. A pop up will appear where you can click on the platform of your choice and share the link for your recipe.
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item group="somegroup" label="7)  How do I popularise my content on Foodism?" >
              <q-card>
                <q-card-section>
                  <p>We believe in original & authentic content. You can popularise your content with the help of the following tips-</p>
                  <ul>
                    <li>The content must be well written, and the recipe/message should be clear & easily readable.</li>
                    <li>Images or the video should be of high quality, and not too zoomed in.</li>
                    <li>You can share your recipe/vlog on different platforms like Instagram, WhatsApp etc.</li>
                    <li>Post regularly to engage your subscribers, this will also increase the ‘I made it’ number!</li>
                    <li>You can also host events for recipe-related cook-alongs, food infotainment etc.</li>
                  </ul>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item group="somegroup" label="8)  How do I search for a recipe?" >
              <q-card>
                <q-card-section>
                  You can easily search for any recipe by simply clicking on the search icon at the bottom, next to the HOME button. Enter the relevant keywords, you can also select the recipe category and you will be able to see all suitable options.
                </q-card-section>
              </q-card>
            </q-expansion-item>

          </q-list>
          </div>
          <!-- <div class="text-center q-mt-lg">
            <router-link class="btn btn1" :to="{ name: 'web-faq' }">View More</router-link>
          </div> -->
        </div>
      </div>

    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'

export default defineComponent({
  name: 'WebFaq',
  setup () {
    return {
      current: ref(3)
    }
  },
})
</script>

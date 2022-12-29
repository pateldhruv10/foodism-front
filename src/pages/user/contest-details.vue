<template>
  <q-page class="contest-detail">
    <span class="q-mr-sm back-arrow"><i class="fas fa-arrow-left"></i></span>
    <div class="contest-slider">
      <contest-slider />
    </div>
    <div class="contest-description">
      <div class="contest-title q-my-sm">
        <h5>You are my cup cake event</h5>
      </div>
      <p class="detail-title">Contest Date</p>
      <h6 class="q-pb-md">Feb 08, <span class="q-px-sm">To</span> Feb 10</h6>
      <p class="detail-title">Description</p>
      <p>
        I'm setting up a form with quasar and use the internal validation. I
        have a group of checkboxes. The user should select at least one of them.
      </p>
      <ul class="dis-point">
        <li>
          I've managed the validation on form submit, but the only thing that is
          annoying me.
        </li>
        <li>
          if the validation fails (aka the user didn't select any checkbox),
          then there is no focus on that field as it is the case for all other
          fields I use the internal validation for.
        </li>
        <li>
          I guess it has something to do with me using a q-field (instead of
          q-input).
        </li>
        <li>
          I found your code working as I understood you expect it except the
          binded disabled which I noticed is an error because linked to a
          method!
        </li>
        <li>
          I did tests with quasar@1.15.23 and the last checkbox unchecked has
          focus after showing validation error then click space on keyboard
          becomes checked.
        </li>
        <li>
          My goal is to install a new set of blinds in an existing window. It
          looks like a former owner tried to do the same thing and split the
          wood on the side of the window casing.
        </li>
        <li>
          Unfortunately the location of the split is exactly where I need to
          screw into. There are plenty of videos out there on how to repair
          split wood, but I can't figure out how to do it without removing the
          window. I'm not excited to go down that road - any other suggestions?
        </li>
      </ul>
      <q-list>
        <q-expansion-item
          group="somegroup"
          :label="$q.lang.contest.termscondition"
          default-opened
          header-class=""
        >
          <q-card>
            <q-card-section>
              <ul class="dis-point">
                <li>
                  I've managed the validation on form submit, but the only thing
                  that is annoying me.
                </li>
                <li>
                  if the validation fails (aka the user didn't select any
                  checkbox), then there is no focus on that field as it is the
                  case for all other fields I use the internal validation for.
                </li>
                <li>
                  I guess it has something to do with me using a q-field
                  (instead of q-input).
                </li>
                <li>
                  I found your code working as I understood you expect it except
                  the binded disabled which I noticed is an error because linked
                  to a method!
                </li>
                <li>
                  I did tests with quasar@1.15.23 and the last checkbox
                  unchecked has focus after showing validation error then click
                  space on keyboard becomes checked.
                </li>
                <li>
                  My goal is to install a new set of blinds in an existing
                  window. It looks like a former owner tried to do the same
                  thing and split the wood on the side of the window casing.
                </li>
                <li>
                  Unfortunately the location of the split is exactly where I
                  need to screw into. There are plenty of videos out there on
                  how to repair split wood, but I can't figure out how to do it
                  without removing the window. I'm not excited to go down that
                  road - any other suggestions?
                </li>
              </ul>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          group="somegroup"
          :label="$q.lang.contest.safety"
          header-class=""
        >
          <q-card>
            <q-card-section>
              <ul class="dis-point">
                <li>
                  I've managed the validation on form submit, but the only thing
                  that is annoying me.
                </li>
                <li>
                  if the validation fails (aka the user didn't select any
                  checkbox), then there is no focus on that field as it is the
                  case for all other fields I use the internal validation for.
                </li>
                <li>
                  I guess it has something to do with me using a q-field
                  (instead of q-input).
                </li>
                <li>
                  I found your code working as I understood you expect it except
                  the binded disabled which I noticed is an error because linked
                  to a method!
                </li>
                <li>
                  I did tests with quasar@1.15.23 and the last checkbox
                  unchecked has focus after showing validation error then click
                  space on keyboard becomes checked.
                </li>
                <li>
                  My goal is to install a new set of blinds in an existing
                  window. It looks like a former owner tried to do the same
                  thing and split the wood on the side of the window casing.
                </li>
                <li>
                  Unfortunately the location of the split is exactly where I
                  need to screw into. There are plenty of videos out there on
                  how to repair split wood, but I can't figure out how to do it
                  without removing the window. I'm not excited to go down that
                  road - any other suggestions?
                </li>
              </ul>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
      <contest-bottom />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  setup() {
    const showcontactsellerform = ref(false)
    const position = ref('top')
    return {
      showcontactsellerform,
      position,
      open(pos) {
        position.value = pos
        showcontactsellerform.value = true
      },
      slide: ref(1),
      autoplay: ref(true),
    }
  },
  components: {
    'contest-slider': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "contest-slider" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/common/contest-slider.vue'
      )
    ),
    'contest-bottom': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "contest-bottom" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/common/contest-bottom.vue'
      )
    ),
  },
  name: 'Recipe-details',
})
</script>
<style lang="scss">
// $
@import 'src/css/components/contest-cards.scss';
</style>

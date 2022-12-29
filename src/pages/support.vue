<template>
  <q-page class="support head-fix">
    <header-with-backbutton
      :title="$q.lang.common.sidebar.support"
      extraClass="fixed-top"
    />
    <!-- <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'settings' }"><i class="fas fa-arrow-left"></i></router-link> {{ $q.lang.common.sidebar.support }}
      </div>
    </div> -->
    <div class="common-inner">
      <div class="q-pb-lg sup-box">
        <span class="sup-title">Write to us</span>
        <div class="row sup-form">
          <div class="col-12 form-group">
            <q-input
              v-model="text"
              label="Subject"
              placeholder="Enter Subject"
            />
          </div>
          <div class="col-12 form-group">
            <q-input
              v-model="description"
              type="textarea"
              label="Description"
              placeholder="Enter Description"
            />
          </div>
          <div class="col-12 form-group">
            <label class="q-mb-sm flex"
              ><span class="sup-title">Upload Screenshort</span></label
            >
            <!-- <q-uploader
              @click="open('upload-option', folderName, 'cover_photo')"
              style="width: 100%"
            /> -->
            <q-input v-model="image" type="file" />
          </div>
          <div class="col-12 form-group">
            <q-btn class="btn3" @click="submit">Submit</q-btn>
          </div>
        </div>
      </div>
      <div class="ps-list" >
        <!-- <div class="ps-list-box">
           <q-item tag="a" href="tel:6359111000" clickable>
            <div class="ps-left">
              <div class="ps-icon">
                <q-img src="~assets/mobile.svg"></q-img>
              </div>
              <span class="flex column">
                <span>{{ $q.lang.common.support.phoneNo }}</span>
                <span class="support-cl">+91 6359111000</span>
                <span @click.prevent="callNumber(entry[column.key])"></span>
              </span>
            </div>
            </q-item>
        </div> -->



        <div class="ps-list-box">
          <q-item  tag="a" href="mailto:help@foodism.xyz" clickable>
            <div class="ps-left">
              <div class="ps-icon"><q-img src="~assets/email.svg"></q-img></div>
              <span class="flex column">
                <span>{{ $q.lang.common.support.emailId }}</span>
                <span class="support-cl">help@foodism.xyz</span>
              </span>
            </div>
          </q-item>
        </div>
      </div>
    </div>
    <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
      <component
        :is="currentFrom"
        :sendValue="sendValue"
        :fieldName="currentField"
        :sendDisplayField="sendDisplayField"
        :sendOptions="sendOptions"
        v-on:selectValue="setValue"
      >
      </component>
    </q-dialog>
  </q-page>
</template>

<script>
import { date, LocalStorage, Notify } from 'quasar'
import { ref, defineComponent, defineAsyncComponent, computed } from 'vue'
import useDialog from 'src/composable/useDialog'
import api from 'src/apis/index'
export default defineComponent({
  name: 'SupportIndex',
  components: {

    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "common-header" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
    'upload-option': defineAsyncComponent(() =>
      // import('../../components/common/all-upload/upload-option.vue')
      import('../components/common/all-upload/upload-option.vue')
    ),
     'details-updated': defineAsyncComponent(() =>
      import('../components/common/details-updated.vue'))
  },
  setup() {
    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      sendOptions,
      open,
    } = useDialog()
    const slide = ref(0)
    const user = computed(() => {
      return LocalStorage.getItem('user')
    })
    return {
      user,
      // folderName: 'support/' + user.value.id,
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      sendOptions,
      open,
      image: ref(null),
      text: ref(''),
      description: ref(''),
      slide,
      phoneNo: ref(true),
      msg: ref(false),
    }
  },

  methods: {
    submit() {
      // console.log(this.image)
      // var data = {
      //   subject: this.text,
      //   description: this.description,
      //   image : this.image[0].name
      // }
      var blob = new Blob(this.image)
      const data = new FormData()
      data.append('subject', this.text)
      data.append('description', this.description)
      data.append('image', blob)

      api.post('user/support', data).then((res) => {
        this.open('details-updated' , 'Support request submitted..!')
      })
    },
  },
})
</script>
<style lang="scss">
// $
.ps-list{
  .ps-list-box{
    a{
      justify-content: initial;
    }
  }
}  
@import 'src/css/policies-settings.scss';
</style>

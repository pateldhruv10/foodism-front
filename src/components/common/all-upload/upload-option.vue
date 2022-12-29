<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>choose from</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section class="pop-body">
      <div v-if="viewPercentage && uploadPercentage !== 100">
        <progress max="100" :value.prop="uploadPercentage"></progress>
        {{ uploadPercentage }}%
      </div>

      <div class="cf-popup">
        <input
          style="display: none"
          ref="input"
          type="file"
          name="image"
          :accept="accept"
          @change="setImage"
        />
        <div class="q-py-sm flex items-center">
          <router-link to="" @click.prevent="showFileChooser">
            <i class="las la-image"></i> <span>Gallery</span>
          </router-link>
        </div>
        <div class="q-py-sm flex items-center">
          <router-link to="" @click="captureImage">
            <i class="las la-camera"></i> <span>Camera</span>
          </router-link>
        </div>
      </div>
    </q-card-section>
    <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
      <component
        :is="currentFrom"
        :sendValue="sendValue"
        :fieldName="currentField"
        :sendDisplayField="sendDisplayField"
        v-on:selectValue="setValue"
      ></component>
    </q-dialog>
  </div>
</template>

<script>
import { ref, defineAsyncComponent, computed } from 'vue'
import { useStore, mapGetters } from 'vuex'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { api } from 'src/boot/axios'
import { axios } from 'src/boot/axios'
import uuid from '../../../composable/uuid'
import useDialog from 'src/composable/useDialog'
import { Loading } from 'quasar'

export default {
  name: 'UploaderOption',
  props: {
    // sendValue: {
    //   type: String,
    //   default: '',
    // },
    fieldName: {
      type: String,
      default: '',
    },
    sendDisplayField: {
      type: String,
      default: null,
    },
    sendOptions: {
      type: Object || Array,
      default: {},
    },
  },
  setup() {
    const {
      allpopup,
      currentFrom,
      sendValue,
      currentField,
      dialogClass,
      open,
    } = useDialog()

    const imgSrc = ref('')
    const store = useStore()
    const uid = uuid()
    const userid = computed(() => {
      return store.getters['auth/getUser']
    });
    async function captureImage() {
      Loading.show()
      if (Camera.checkPermissions()) {
        const image = await Camera.getPhoto({
          quality: 100,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera,
        })
        //  Loading.show()
        // console.log(image.dataUrl)
        imgSrc.value = image.dataUrl
        open('cropper-dialog', imgSrc.value, 'imgSrc')
        Loading.hide()
        console.log(imgSrc.value)
      } else {
        await Camera.requestPermissions('camera')
        captureImage()
      }
    }
    return {
      // Loading,
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      sendValue,
      open,
      accept: ref('image/*'),
      imgSrc,
      uid,
      userid,
      captureImage,
      uploadPercentage: ref(0),
      viewPercentage: ref(false),
    }
  },
  created() {
    this.accept = this.sendOptions.accept || 'image/*'
  },
  components: {
    'cropper-dialog': defineAsyncComponent(() =>
      import('src/components/common/CropperDialog.vue')
    ),
  },
  methods: {
    showFileChooser() {
      this.$refs.input.click()
    },
    async setImage(e) {
      this.imgSrc = window.URL.createObjectURL(new Blob([e.target.files[0]]))
      // console.log(this.imgSrc)
      this.open('cropper-dialog', this.imgSrc, 'imgSrc')
      //
    },
    setValue(data) {
      console.log(data)
      this.allpopup = false
      if (data.field === 'imgSrc') {
        this.imgSrc = this.uploadImage(data.value)
      } else {
        this[`${data.field}`] = data.value
      }
    },
    async uploadImage(image) {
      const response = await fetch(image)
      const blob = await response.blob()
      this.viewPercentage = true
      console.log(this.$attrs.sendValue)
      await api
        .get(
          `upload-request?Key=users/${this.userid.id}/${this.$attrs.sendValue}/${this.uid}.${
            blob.type.split('/')[1]
          }&ContentType=${blob.type}`
        )
        .then((res) => {
          console.log(res.data.data.Key)
          this.imgSrc = process.env.TEMP_ASSET_ENDPOINT + res.data.data.Key
          axios
            .put(res.data.data.uploadURL, blob, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              onUploadProgress: function (progressEvent) {
                this.uploadPercentage = parseInt(
                  Math.round((progressEvent.loaded / progressEvent.total) * 100)
                )
              }.bind(this),
            })
            .then((result) => {
              this.setData()
              console.log('result', result)
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setData() {
      this.$emit('selectValue', {
        value: this.imgSrc,
        field: this.fieldName,
      })
    },
  },
}
</script>

<style lang="scss">
// $
</style>

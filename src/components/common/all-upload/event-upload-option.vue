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
import { ref, defineAsyncComponent } from 'vue'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { api } from 'src/boot/axios'
import { axios } from 'src/boot/axios'
import uuid from '../../../composable/uuid'
import useDialog from 'src/composable/useDialog'
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
    const uid = uuid()

    return {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      dialogClass,
      open,
      accept: ref('image/*'),
      imgSrc,
      uid,
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
    async captureImage() {
      if (Camera.checkPermissions()) {
        const image = await Camera.getPhoto({
          quality: 100,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera,
        })

        this.imgSrc = image.dataUrl

      } else {
        await Camera.requestPermissions('camera')
        captureImage()
      }
    },
    async setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf('image/') === -1) {
        // alert('Please select an image file');
        return;
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        // alert('Sorry, FileReader API not supported');
      }
      // this.imgSrc = window.URL.createObjectURL(new Blob([e.target.files[0]]))
      // this.open('cropper-dialog', this.imgSrc, 'imgSrc')
      //

      // this.viewPercentage = true
      // this.imgSrc = window.URL.createObjectURL(new Blob([e.target.files[0]]))
      // this.imgSrc

    },
    // async setValue(data) {
    //   console.log(data)
    //   this.allpopup = false
    //   if (data.field === 'imgSrc') {
    //     this.imgSrc = data.value
    //     this.setData()
    //   } else {
    //     this[`${data.field}`] = data.value
    //   }
    // },
    setData() {
      this.$emit('selectValue', {
        value: this.imgSrc,
        field: this.fieldName,
      })
    },
  },
  watch: {
    imgSrc(val) {
      if (val) {
        this.setData()
      }

    }
  }
}
</script>

<style lang="scss">
// $
</style>

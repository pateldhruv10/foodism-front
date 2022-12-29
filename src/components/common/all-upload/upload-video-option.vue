<template>
  <!-- <div> -->
  <div v-if="viewPercentage && uploadPercentage !== 100">
    <progress max="100" :value.prop="uploadPercentage"></progress>
    {{ uploadPercentage }}%
  </div>
  <div v-if="!video" class="upload-option" @click="showFileChooser()">
    <input
      style="display: none"
      ref="input"
      type="file"
      name="image"
      :accept="accept"
      @change="setVideo"
      max-file-size="2147483648"
    />
    <div class="icon">
      <i class="las la-camera-retro"></i>
      <span>{{ $q.lang.addRecipes.stepTwo.fields.video.addVideo }}</span>
    </div>
  </div>

  <div v-else class="video-after-upload">
    <video
      @click="showFileChooser()"
      :src="video"
      controls
      accept="video/mp4,video/x-m4v,video/*"
      class="q-mr-md upload-video"
      max-file-size="2147483648"
    ></video>
    <div class="video-control">
      <q-btn icon="las la-trash" title="Remove" @click="video = null" />
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { ref , computed} from 'vue'
import { useStore, mapGetters } from 'vuex'
import api from '../../../apis/index'
import { axios } from 'src/boot/axios'
import uuid from 'src/composable/uuid'
export default {
  name: 'UploadVideoOption',
  props: {
    folderName: {
      type: String,
      default: '',
    },
    fieldName: {
      type: String,
      default: '',
    },
    videoLink: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const video = ref(props.videoLink || null)
    const store = useStore()
    const uid = uuid()
    const userid = computed(() => {
      return store.getters['auth/getUser']
    });
    return {
      accept: ref('video/*'),
      uploadPercentage: ref(0),
      disableOn: ref(true),
      viewPercentage: ref(false),
      uid,
      userid,
      video,
    }
  },
  methods: {
    showFileChooser() {
      this.$refs.input.click()
    },
    async setVideo(e) {
      this.viewPercentage = true
      this.disableOn = false
      const file = e.target.files[0]

      if (file.type !== 'video/mp4') {
        // alert('Invalid Video type !')
        return false
      } else {
      }
      if(file.size > 2147483648){
        return false
      }else{

      }
      var filenewname="food_"+Date.now()+".mp4";
      await api
        .get(
          `upload-request?Key=users/${this.userid.id}/${this.folderName}/videos/${filenewname}&ContentType=${file.type}`
        )
        .then((res) => {
          console.log(res.data.Key)

          axios
            .put(res.data.uploadURL, file, {
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
              this.video = process.env.TEMP_ASSET_ENDPOINT + res.data.Key
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
      console.log('==>', this.video)
      this.$emit('selectValue', {
        value: this.video,
        field: this.fieldName,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>

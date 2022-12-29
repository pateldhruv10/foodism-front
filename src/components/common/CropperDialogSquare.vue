<template>
  <div class="wrapper items-center no-scroll">
    <!-- <div class="row space-between no-wrap"> -->
    <div class="crop-box items-center no-wrap">
      <div class="container">
        <img ref="image" :src="sendValue" />
      </div>
      <div class="row justify-center no-wrap q-pt-md">
        <q-btn round icon="rotate_left" color="primary" @click="rotateLeft()">
          <q-tooltip content-class="bg-secondary">Rotate left</q-tooltip>
        </q-btn>
        <q-btn round icon="rotate_right" color="primary" @click="rotateRight()">
          <q-tooltip content-class="bg-secondary">Rotate right</q-tooltip>
        </q-btn>
        <q-btn
          round
          icon="settings_backup_restore"
          color="primary"
          @click="resetCropper()"
        >
          <q-tooltip content-class="bg-secondary">Reset</q-tooltip>
        </q-btn>
        <q-btn round icon="close" color="primary" v-close-popup>
          <q-tooltip content-class="bg-secondary">Cancel</q-tooltip>
        </q-btn>
        <q-btn
          round
          icon="done"
          color="primary"
          @click="finish()"
          v-close-popup
        >
          <q-tooltip content-class="bg-secondary">Crop and finish</q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  name: 'CropperDialog',
  data() {
    return {
      cropper: {},
      destination: {},
    }
  },
  props: {
    sendValue: {
      type: [String, Object],
    },
    fieldName: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.startCropper()
  },
  methods: {
    startCropper() {
      console.log(this.$route.name)
      this.cropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        // aspectRatio: this.$route.name == 'user-edit' ? 9 / 9 : 16 / 9,
        aspectRatio: 1 / 1,
        cropBoxResizable: true,
        // data:{
        //   width: 600,
        //     height:  300,
        // },
        // minCropBoxWidth: 600,
        // minCropBoxHeight: 300,
        crop: () => {
          // console.log(event.detail.x)
          // console.log(event.detail.y)
          // console.log(event.detail.width)
          // console.log(event.detail.height)
          // console.log(event.detail.rotate)
          // console.log(event.detail.scaleX)
          // console.log(event.detail.scaleY)
          this.destination = this.cropper
            .getCroppedCanvas()
            .toDataURL('image/jpeg')
        },
      })
    },
    destroyCropper() {
      this.cropper.destroy()
    },
    resetCropper() {
      this.cropper.reset()
    },
    rotateLeft() {
      this.cropper.rotate(-90)
    },
    rotateRight() {
      this.cropper.rotate(90)
    },

    async finish() {
      this.$emit('selectValue', {
        value: this.destination,
        field: this.fieldName,
      })
    },
  },
}
</script>

<style lang="scss">
// $
.wrapper {
  max-width: 80vw;
  padding: 15px;
  background-color: rgb(230, 230, 230);
  border-radius: 10px !important;
  .crop-box {
    .container {
      // width: 93%;
      margin: 3px;
      img {
        display: block;
        max-width: 100%;
        max-height: 400px;
      }
      .preview-container {
        width: 93%;
        padding: 2px;
        background: #fff;
        border-radius: 3px;
        .preview {
          max-height: 200px;
        }
      }
    }
    .q-btn {
      margin: 0 5px;
      min-width: 42px;
    }
  }
}

/***  media query  ***/
@media screen and (min-width: 500px) {
  // .wrapper{
  //   max-width:50vw;
  // }
}
@media screen and (min-width: 800px) {
  // .wrapper{
  //   max-width: 30vw;
  // }
}
</style>

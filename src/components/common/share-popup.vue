<template>
  <div class="cus-popup share-recipe">
    <div class="center-pop-head relative-position">
      <h6>Share this {{ sendValue.type }}</h6>
      <q-btn
        class="absolute-right"
        icon="close"
        flat
        round
        dense
        v-close-popup
      />
    </div>
    <q-card-section class="pop-body">
      <div class="rcp-view">
        <div class="rcp-thumb">
          <q-img :src="getCoverPhoto(sendValue.images)" :loading="eager" :decoding="async" fetch-priority="high" no-spinner></q-img>
        </div>
        <div class="rcp-info">
          <h6>{{ sendValue.title }}</h6>
          <p>{{ showDate() }}</p>
        </div>
      </div>
      <div class="rcp-share-box q-pt-sm">
        <h6>Share the link with</h6>
        <div class="rcp-share-link">
          <ShareNetwork network="whatsapp" :title="sendValue.title" :url="url">
            <q-img src="~assets/wts.svg"></q-img>
          </ShareNetwork>
          <ShareNetwork network="facebook" :title="sendValue.title" :url="url">
            <q-img src="~assets/fb.svg"></q-img>
          </ShareNetwork>
          <ShareNetwork network="twitter" :title="sendValue.title" :url="url">
            <q-img src="~assets/twt.svg"></q-img>
          </ShareNetwork>
          <ShareNetwork network="linkedIn" :title="sendValue.title" :url="url">
            <q-img src="~assets/lin.svg"></q-img>
          </ShareNetwork>
          <a class="share-network-linkedin" @click="share()">
            <q-img src="~assets/share-other.svg"></q-img
          ></a>
        </div>
      </div>
      <div class="rcp-copy-link q-mt-md">
        <div class="rcp-link">
          <span>{{ sendValue.type }} link</span>
          <p @click="gotoURL(url)">{{ url }}</p>
        </div>
        <div class="copy-icon" @click="writeToClipboard">
          <span @click="copyToClipboard()" class="material-icons">content_copy</span>
        </div>
      </div>
    </q-card-section>
  </div>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      v-on:selectValue="setValue"
    ></component>
  </q-dialog>
</template>

<script>
import { Notify, openURL } from 'quasar'
import { Share } from '@capacitor/share'
import { Clipboard } from '@capacitor/clipboard'
import shareImage from 'src/composable/shareImage'
import { DateTime } from 'luxon'
import { computed } from '@vue/runtime-core'
import coverImage from 'src/composable/coverPhoto'
export default {
  name: 'SharePopup',
  props: {
    sendValue: {
      type: String,
      default: '',
    },
  },
  setup(props) {
     const {getCoverPhoto} = coverImage()
    const { showImage, GetUrl, getImg } = shareImage()

    const url = computed(() => {
      return GetUrl(props.sendValue?.type, props.sendValue?.slug)
    })

    const writeToClipboard = async () => {
      await Clipboard.write({
        string: url.value,
      })
    }

    return {
      getCoverPhoto,
      writeToClipboard,
      getImg,
      GetUrl,
      showImage,
      url,
    }
  },
  methods: {
    copyToClipboard(){
      Notify.create({
        type : 'positive',
        message : 'Copied !',
        timeout : 500
      })
    },
    gotoURL(url) {
      openURL(url)
    },
    showDate() {
      return DateTime.fromISO(this.sendValue.date)
        .setLocale('en')
        .toFormat('dd MMM yyyy')
    },
    async share() {
      const data = {
        title: this.sendValue.title,
        text: this.sendValue.title,
        url: this.url,
      }
      await Share.share(data)
    },
  },
}
</script>
<style lang="scss">
// $
.share-recipe {
  .rcp-view {
    padding: 10px;
    background: $bg6;
    display: flex;
    align-items: center;
    .q-img {
      width: 100px;
      height: 80px;
      margin-right: 10px;
      @extend .border-radius2;
    }
    .rcp-info {
      h6 {
        font-size: 18px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.2;
      }
      p {
        font-size: 14px !important;
        margin: 0;
        @extend .primary-font-semibold;
      }
    }
  }
  .rcp-share-box {
    h6 {
      font-size: 16px;
    }
    .rcp-share-link {
      .q-img {
        width: 45px;
        margin-right: 15px;
      }
    }
  }
  .rcp-copy-link {
    padding: 10px;
    background: $bg6;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    @extend .primary-font-semibold;
    .rcp-link {
      max-width: 85%;
      p {
        margin: 0;
        word-break: break-all;
      }
    }
    .copy-icon {
      font-size: 30px;
      min-width: 30px;
      text-align: right;
    }
  }
}
/***  media query  ***/
@media only screen and (max-width: 479px) {
  .share-recipe {
    .rcp-share-box {
      .rcp-share-link {
        .q-img {
          width: 35px;
        }
      }
    }
    .rcp-copy-link {
      .copy-icon {
        font-size: 24px;
      }
    }
  }
}
</style>

<template>
  <div class="select-cus-popup event-review">
    <q-card-section class="row items-center pop-head">
      <h6>Review Event</h6>
      <q-space />
      <q-btn label="Skip" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="event-review-box">
        <div class="event-img">
          <q-img src="~assets/fd3.jpg"></q-img>
        </div>
        <h5 class="q-pt-md">Event Title lorem ipsum</h5>
        <div class="q-mb-lg">
          <q-input
            v-model="text"
            label="Enter Review"
            type="textarea"
          />
        </div>
        <div class="q-mb-lg">
          <q-rating
            v-model="ratingModel"
            size="3.5em"
            color="deep-orange-9"
            icon="star_border"
            icon-selected="star"
          />
        </div>
      </div>
      <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn
        class="btn full-width btn1"
        flat
        dense> Submit </q-btn>
      </div>

    </q-card-section>
  </div>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      :sendDisplayField="sendDisplayField"
      v-on:selectValue="setValue"
    ></component>
  </q-dialog>
</template>

<script>
import { defineAsyncComponent, ref, computed } from 'vue'
import useDialog from 'src/composable/useDialog'
export default {
  name: "eventreview",
  
  setup(props) {
    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()
    const useroption = ref(false)
    return {
      ratingModel: ref(3),
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      useroption,
      setValue(data) {
        console.log(data)
        this.allpopup = false
        this[`${data.field}`] = data.value
      },
      share: computed(() => {
        return {
          type: 'recipe',
          title: 'Idli Sambhar',
          images: 'https://localhost:8080/img/c7.35cba6d3.jpg',
          date: '2020-06-01',
          slug: 'idli-sambhar',
        }
      }),
    }
  },
}
</script>
<style lang="scss">
// $
.event-review{
  .pop-head{
    .q-btn{
      .q-btn__content{
        text-transform: capitalize;
        font-weight: 600;
      }
    }
  }
  .event-review-box{
    text-align: center;
    padding-bottom: 15px;
    .event-img{
      width: 70%;
      margin: 0 auto;
      .q-img{
        @extend .border-radius3;
      }
    }
    .q-field{
      border-bottom: 1px solid #d2d2d2;
    }
  }
}

</style>

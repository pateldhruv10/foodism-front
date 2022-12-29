<template>
  <div class="cus-popup thank-sub">
    <q-card-section class="pop-body text-center">
      <q-img src="~assets/sd-btm-bg.png"></q-img>
      <!-- <h6>{{$q.lang.common.thankyou.Title}}</h6> -->
      <h6> {{sendValue}} </h6>
      <div class="cp-btn q-py-md">
        <q-btn class="btn1" label="Go to home" :to="{ name: 'user-home' }"/>
      </div>
    </q-card-section>
  </div>
</template>

<script>
export default {
  name: "ThankSubmit",
  props:{
    sendValue: {
      type: [String, Object],
    }}
}
</script>
<style lang="scss">
// $
.thank-sub{
  .q-img{
    width: 150px;
    margin-bottom: 20px;
  }
  .q-btn{
    min-width: 100px;
    margin-right: 0 !important;
  }
}

</style>

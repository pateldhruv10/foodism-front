<template>
  <div class="no-event" color="primary" size="40px">
     <q-img src="~assets/no-data-new.png"></q-img>
      <!-- {{ $q.lang.userProfile.view.notAddedEvent }} -->
      No {{item}} Available
  </div>
</template>
<script>
export default {
  name: "not added",
   props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>

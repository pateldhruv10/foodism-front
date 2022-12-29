<template>
  <q-form @submit="searchTerm" class="mp-search">
    <q-input v-model="search" type="search" placeholder="Search" :dense="dense">
      <q-icon name="search"></q-icon>
    </q-input>
  </q-form>
</template>

<script>
export default {
  name: "HomeSearch",
  data() {
    return {
      search: "",
      dense: false
    };
  },
  methods: {
    searchTerm() {
      this.$router.push("search?key=" + this.search);
    }
  },
}
</script>

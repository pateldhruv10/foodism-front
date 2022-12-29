<template>
  <q-page class="all-cuisine">
    <header-with-backbutton :title="Cuisines">
      <template #right>
        <router-link to="/Searchcuisines"
          ><i class="fas fa-search"></i
        ></router-link>
      </template>
    </header-with-backbutton>
    <div class="common-inner">
      <div class="ac-list">
        <div class="ac-box">
          <div class="ac-info">
            <router-link to=""
              ><q-img src="../assets/c1.jpg"></q-img>
              <p>Indian</p></router-link
            >
          </div>
        </div>
        <div class="ac-box">
          <div class="ac-info">
            <router-link to=""
              ><q-img src="../assets/c2.jpg"></q-img>
              <p>mexican</p></router-link
            >
          </div>
        </div>
        <div class="ac-box">
          <div class="ac-info">
            <router-link to=""
              ><q-img src="../assets/c3.jpg"></q-img>
              <p>italian</p></router-link
            >
          </div>
        </div>
        <div class="ac-box">
          <div class="ac-info">
            <router-link to=""
              ><q-img src="../assets/c4.jpg"></q-img>
              <p>japanese</p></router-link
            >
          </div>
        </div>
        <div class="ac-box">
          <div class="ac-info">
            <router-link to=""
              ><q-img src="../assets/c5.jpg"></q-img>
              <p>french</p></router-link
            >
          </div>
        </div>
        <div class="ac-box">
          <div class="ac-info">
            <router-link to=""
              ><q-img src="../assets/c6.jpg"></q-img>
              <p>thai</p></router-link
            >
          </div>
        </div>
        <div class="ac-box">
          <div class="ac-info">
            <router-link to=""
              ><q-img src="../assets/c7.jpg"></q-img>
              <p>Chinese</p></router-link
            >
          </div>
        </div>
        <div class="ac-box">
          <div class="ac-info">
            <router-link to=""
              ><q-img src="../assets/c8.jpg"></q-img>
              <p>Taco</p></router-link
            >
          </div>
        </div>
        <div class="ac-box">
          <div class="ac-info">
            <router-link to=""
              ><q-img src="../assets/c9.jpg"></q-img>
              <p>Tibetan</p></router-link
            >
          </div>
        </div>
        <div class="ac-box">
          <div class="ac-info">
            <router-link to=""
              ><q-img src="../assets/c10.jpg"></q-img>
              <p>Vietnamese</p></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'AllcuisinesIndex',
  components: {
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "header-with-backbutton" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
  },
})
</script>

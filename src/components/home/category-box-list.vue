<template>
  <!-- <div class="cat-box-list">
    <div class="cat-box" v-for="n in 5" :key="n">
      <q-img src="~assets/cat1.png"></q-img>
      <h6>{{ name }}</h6>
      <p>{{ totalRecipes }}</p>
    </div>
  </div> -->
  <div class="cat-box-list">
    <div class="cat-box cat-box-cus">
      <q-img src="~assets/cat1.jpg"></q-img>
      <div class="cat-box-text">
        <h6>Healthy Recipes</h6>
        <!-- <p>{{ totalRecipes }}</p> -->
      </div>
    </div>
    <div class="cat-box cat-box-cus">
      <q-img src="~assets/cat2.jpg"></q-img>
      <div class="cat-box-text">
        <h6>quick recipes</h6>
        <!-- <p>{{ totalRecipes }}</p> -->
      </div>
    </div>
    <div class="cat-box cat-box-cus">
      <q-img src="~assets/cat3.jpg"></q-img>
      <div class="cat-box-text">
        <h6>popular recipes</h6>
        <!-- <p>{{ totalRecipes }}</p> -->
      </div>
    </div>
    
    <div class="cat-box cat-box-cus">
      <q-img src="~assets/cat4.jpg"></q-img>
      <div class="cat-box-text">
        <h6>vegan recipes</h6>
        <!-- <p>{{ totalRecipes }}</p> -->
      </div>
    </div>
    <div class="cat-box cat-box-cus">
      <q-img src="~assets/cat5.jpg"></q-img>
      <div class="cat-box-text">
        <h6>special recipes</h6>
        <!-- <p>{{ totalRecipes }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryBoxList',
  props: {
    sendValue: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      name: 'Health & wellness',
      totalRecipes: '132 Recipes',
    }
  },
}
</script>

<style lang="scss" scoped>
//$
.cat-box-list{
  padding-bottom: 5px;
  padding-top:5px ;
  .cat-box{
    background: transparent;
    box-shadow: 0 0 3px gray;
    border-radius: 10px;
    h6{
      text-transform: capitalize;
      @extend .primary-font;
    }
    .q-img{
      width: 80px;
      margin: 10px 0;
    }
  }
  .cat-box.cat-box-cus{
    position: relative;
    border-radius: 10px;
    max-height: 180px;
    padding: 0;
    overflow: hidden;
    .q-img{
      width: 100%;
      margin: 0;
      border-radius: 10px;
    }
    .cat-box-text{
      position: absolute;
      bottom:0;
      width:100%;
      background: rgba($color: #000000, $alpha: 0.6);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: 10px;
      h6{
        color: #fff;
        // margin-bottom: 5px;
      }
      p{
        color: #fff;
      }
    }
  }
  .cat-box{
    padding: 0;
    .q-img{
      width: 130px;
      margin: 0;
      border-radius: 10px;
      // box-shadow:0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px rgb(0 0 0 / 14%), 0 1px 10px rgb(0 0 0 / 12%) ;
    }
  }
}
</style>

<template>
  <q-page class="recipe-detail recipe-preview">
    <div class="recipe-box">
      <div class="recipe-head flex items-center">
        <div class="rec-user-img">
          <router-link to=""
            ><q-img src="~assets/pr-pic.jpg"></q-img
          ></router-link>
        </div>
        <div class="rec-user-detail">
          <p class="user-name">
            <router-link to="">sameeksha joshi</router-link>
          </p>
          <p class="post-time">15 hours ago</p>
        </div>
        <div class="recipe-head-right">
          <ul>
            <li>
              <q-icon
                name="las la-ellipsis-v"
                @click="open('user-option', useroption)"
              ></q-icon>
            </li>
          </ul>
        </div>
      </div>
      <div class="recipe-title">
        <h5>Idli Sambhar <i class="las la-pen"></i></h5>
      </div>
      <div class="recipe-img">
        <q-img src="~assets/c7.jpg"></q-img>
        <div class="user-view">
          <div class="view-count"></div>
          <div class="time-count"><i class="las la-pen"></i></div>
        </div>
      </div>
    </div>
    <div class="recipe-description">
      <h5>Recipe Card</h5>
      <div class="cat-qun q-pt-md q-pb-lg">
        <div class="row q-col-gutter-x-lg">
          <div class="col-6">
            <div class="relative-position">
              <p class="detail-title">Diet Category</p>
              <div class="absolute-right edit-option">
                <i class="las la-pen"></i>
              </div>
            </div>
            <h6>Non Veg</h6>
          </div>
          <div class="col-6">
            <div class="relative-position">
              <p class="detail-title">Portion Quantity</p>
              <div class="absolute-right edit-option">
                <i class="las la-pen"></i>
              </div>
            </div>
            <h6>4 Servings</h6>
          </div>
        </div>
      </div>
      <div class="recipe-tag q-pb-lg">
        <div class="relative-position">
          <p class="detail-title">Recipe tag</p>
          <div class="absolute-right edit-option">
            <i class="las la-pen"></i>
          </div>
        </div>
        <div class="taglist">
          <ul>
            <li><q-btn icon-right="close" label="#FoodismRepublicRewind" /></li>
            <li><q-btn icon-right="close" label="#Sweets" /></li>
            <li><q-btn icon-right="close" label="#Myrecipe" /></li>
          </ul>
        </div>
      </div>
      <div class="recipe-time q-pb-lg">
        <div class="relative-position">
          <p class="detail-title">Recipe Prepation Time</p>
          <div class="absolute-right edit-option">
            <i class="las la-pen"></i>
          </div>
        </div>
        <div class="prepar-box">
          <div class="box-cus">
            <div class="box-cus-effect">
              <q-img class="hour-none" src="~assets/cooking.png"></q-img>
              <p class="hour-block"><span>120</span> mins</p>
            </div>
            <p>Preparation</p>
          </div>
          <div class="box-cus">
            <div class="box-cus-effect">
              <q-img class="hour-none" src="~assets/cooking.png"></q-img>
              <p class="hour-block"><span>120</span> mins</p>
            </div>
            <p>Cooking</p>
          </div>
          <div class="box-cus">
            <div class="box-cus-effect">
              <q-img class="hour-none" src="~assets/cooking.png"></q-img>
              <p class="hour-block"><span>120</span> mins</p>
            </div>
            <p>Baking</p>
          </div>
          <div class="box-cus">
            <div class="box-cus-effect">
              <q-img class="hour-none" src="~assets/cooking.png"></q-img>
              <p class="hour-block"><span>120</span> mins</p>
            </div>
            <p>Resting</p>
          </div>
        </div>
      </div>
      <div class="ingredient-list q-pb-lg">
        <div class="relative-position">
          <p class="detail-title">Ingredients</p>
          <div class="absolute-right edit-option">
            <i class="las la-pen"></i>
          </div>
        </div>
        <ul>
          <li>Green Capsicum <span>2 piece</span></li>
          <li>Tomato <span>1 piece</span></li>
          <li>Ginger Garlic paste <span>1 tablespoon</span></li>
          <li>Read chilli powder <span>1 teaspoon</span></li>
          <li>Black pepper powder <span>1 teaspoon</span></li>
        </ul>
      </div>
      <div class="utensil-list q-pb-lg">
        <div class="relative-position">
          <p class="detail-title">Utensils</p>
          <div class="absolute-right edit-option">
            <i class="las la-pen"></i>
          </div>
        </div>
        <div class="taglist">
          <ul>
            <li><q-btn icon-right="close" label="Sauce pan" /></li>
            <li><q-btn icon-right="close" label="Flat pan" /></li>
            <li><q-btn icon-right="close" label="Tea spoon" /></li>
            <li><q-btn icon-right="close" label="Table spoon" /></li>
            <li><q-btn icon-right="close" label="Plate" /></li>
          </ul>
        </div>
      </div>
      <div class="dish-type q-pb-lg">
        <div class="relative-position">
          <p class="detail-title">Dish type</p>
          <div class="absolute-right edit-option">
            <i class="las la-pen"></i>
          </div>
        </div>
        <div class="taglist">
          <ul>
            <li><q-btn icon-right="close" label="main course" /></li>
            <li><q-btn icon-right="close" label="dessert" /></li>
            <li><q-btn icon-right="close" label="starter" /></li>
          </ul>
        </div>
      </div>
      <div class="cusine-type q-pb-lg">
        <div class="relative-position">
          <p class="detail-title">Cusine type</p>
          <div class="absolute-right edit-option">
            <i class="las la-pen"></i>
          </div>
        </div>
        <div class="taglist">
          <ul>
            <li><q-btn icon-right="close" label="Indian" /></li>
            <li><q-btn icon-right="close" label="chinese" /></li>
            <li><q-btn icon-right="close" label="italian" /></li>
          </ul>
        </div>
      </div>
      <div class="step-list-view">
        <div class="relative-position">
          <p class="detail-title">Steps</p>
        </div>
        <p><b>Recipe Photos and Videos (5)</b></p>
        <div class="recipe-img-list">
          <div class="img-list-box">
            <q-img src="~assets/c1.jpg"></q-img>
          </div>
          <div class="img-list-box">
            <q-img src="~assets/c2.jpg"></q-img>
          </div>
          <div class="img-list-box">
            <q-img src="~assets/c3.jpg"></q-img>
          </div>
          <div class="img-list-box">
            <q-img src="~assets/c4.jpg"></q-img>
          </div>
          <div class="img-list-box">
            <q-img src="~assets/c5.jpg"></q-img>
          </div>
        </div>
        <div class="recipe-step-dis">
          <div class="step-title">
            Step 1/8 <span><i class="las la-pen"></i></span>
          </div>
          <p>
            Put oil in sauce pan. Add finely chopped onion, tomato, garlic,
            ginger, corriander, capsicum. Saute for a few minutes, let it cool
            for a few minutes.
          </p>
          <q-img src="~assets/c1.jpg"></q-img>
        </div>
        <div class="recipe-step-dis">
          <div class="step-title">
            Step 2/8 <span><i class="las la-pen"></i></span>
          </div>
          <p>
            Put oil in sauce pan. Add finely chopped onion, tomato, garlic,
            ginger, corriander, capsicum. Saute for a few minutes, let it cool
            for a few minutes.Put oil in sauce pan. Add finely chopped onion,
            tomato, garlic, ginger, corriander, capsicum. Saute for a few
            minutes, let it cool for a few minutes.Put oil in sauce pan. Add
            finely chopped onion, tomato, garlic, ginger, corriander, capsicum.
            Saute for a few minutes, let it cool for a few minutes.
          </p>
        </div>
        <div class="recipe-step-dis">
          <div class="step-title">
            Step 3/8 <span><i class="las la-pen"></i></span>
          </div>
          <p>
            Put oil in sauce pan. Add finely chopped onion, tomato, garlic,
            ginger, corriander, capsicum. Saute for a few minutes, let it cool
            for a few minutes.
          </p>
          <q-img src="~assets/c2.jpg"></q-img>
        </div>
        <div class="final-note">
          <div class="relative-position">
            <p class="detail-title">Final Note</p>
            <div class="absolute-right edit-option">
              <i class="las la-pen"></i>
            </div>
          </div>
          <p>
            Put oil in sauce pan. Add finely chopped onion, tomato, garlic,
            ginger, corriander, capsicum. Saute for a few minutes, let it cool
            for a few minutes.Put oil in sauce pan. Add finely chopped onion,
            tomato, garlic, ginger, corriander, capsicum. Saute for a few
            minutes, let it cool for a few minutes.Put oil in sauce pan. Add
            finely chopped onion, tomato, garlic, ginger, corriander, capsicum.
            Saute for a few minutes, let it cool for a few minutes.
          </p>
        </div>
      </div>
    </div>
    <div class="fixed-bottom contact-seller">
      <q-btn class="btn btn1 full-width" label="Submit" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'
import useDialog from 'src/composable/useDialog'

export default defineComponent({
  setup() {
    const { allpopup, currentFrom, currentField, dialogClass, open } =
      useDialog()

    return {
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open,
      slide: ref(1),
      autoplay: ref(true),
    }
  },
  components: {
    // 'recipe-price' : require('components/product-box/recipe-price.vue').default,
  },
  name: 'Recipe-Preview',
})
</script>
<style lang="scss">
// $
@import '../css/components/recipe-cards.scss';
@import '../css/page/recipe-details.scss';
</style>

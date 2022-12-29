<template>
  <div class="cus-popup">
    <q-card-section class="pop-body text-center">
      <ul class="emoji-list">
        
        <!-- <li>
          <q-img
            @click="setData('Clap')"
            src="~assets/clap-congratulations-party.png"
            v-if="reaction !== 'Clap'"
          ></q-img>
          <q-img
            @click="setData('Clear')"
            src="~assets/clap-congratulations-party.png"
            v-else
          ></q-img>
          <span>Clap</span>
        </li> -->
        <!-- <li>
          <q-img
            @click="setData('Greetings')"
            src="~assets/Greetings-best.png"
            v-if="reaction !== 'Greetings'"
          ></q-img>
          <q-img
            @click="setData('Clear')"
            src="~assets/Greetings-best.png"
            v-else
          ></q-img>
          <span>Greetings</span>
        </li> -->
        <li>
          <q-img
            @click="setData('LoveLike')"
            src="~assets/Love-Like.png"
            v-if="reaction !== 'LoveLike'"
          ></q-img>
          <q-img
            @click="setData('Clear')"
            src="~assets/Love-Like.png"
            v-else
          ></q-img>
          <!-- <span>Love</span> -->
        </li>
        <li>
          <q-img
            @click="setData('Yummy')"
            src="~assets/yummy-tasty.png"
            v-if="reaction !== 'Yummy'"
          ></q-img>
          <q-img
            @click="setData('Clear')"
            src="~assets/yummy-tasty.png"
            v-else
          ></q-img>
          <!-- <span>yummy</span> -->
        </li>
        <li>
          <q-img
            @click="setData('Chef')"
            src="~assets/chef.png"
            v-if="reaction !== 'Chef'"
          ></q-img>
          <q-img
            @click="setData('Clear')"
            src="~assets/chef.png"
            v-else
          ></q-img>
          <!-- <span>Chef</span> -->
        </li>
        <li>
          <q-img
            @click="setData('Drool')"
            src="~assets/drool.png"
            v-if="reaction !== 'Drool'"
          ></q-img>
          <q-img
            @click="setData('Clear')"
            src="~assets/drool.png"
            v-else
          ></q-img>
          <!-- <span>Drool</span> -->
        </li>
        <li>
          <q-img
            @click="setData('Hot')"
            src="~assets/hot-spicy.png"
            v-if="reaction !== 'Hot'"
          ></q-img>
          <q-img
            @click="setData('Clear')"
            src="~assets/hot-spicy.png"
            v-else
          ></q-img>
          <!-- <span>Hot</span> -->
        </li>
      </ul>
      <!-- <ul class="emoji-list">
        <li>
          <q-img
            @click="setData('Chocolate')"
            src="~assets/Chocolate.svg"
            v-if="reaction !== 'Chocolate'"
          ></q-img>
          <q-img
            @click="setData('Clear')"
            src="~assets/Chocolate.svg"
            v-else
          ></q-img>
          <span>Chocolate</span>
        </li>
        <li>
          <q-img
            @click="setData('Hot')"
            src="~assets/Hot.svg"
            v-if="reaction !== 'Hot'"
          ></q-img>
          <q-img
            @click="setData('Clear')"
            src="~assets/Hot.svg"
            v-else
          ></q-img>
          <span>chilli hot</span>
        </li>
        <li>
          <q-img
            @click="setData('Pizza')"
            src="~assets/Pizza.svg"
            v-if="reaction !== 'Pizza'"
          ></q-img>
          <q-img
            @click="setData('Clear')"
            src="~assets/Pizza.svg"
            v-else
          ></q-img>
          <span>pizza</span>
        </li>
         <li>
          <q-img
            @click="setData('Yumm')"
            src="~assets/yumm.svg"
            v-if="reaction !== 'Yumm'"
          ></q-img>
          <q-img
            @click="setData('Clear')"
            src="~assets/yumm_colour.svg"
            v-else
          ></q-img>
          <span>yumm</span>
        </li>
        <li>
          <q-img
            @click="setData('Droll')"
            src="~assets/Drool.svg"
            v-if="reaction !== 'Droll'"
          ></q-img>
          <q-img
            @click="setData('Clear')"
            src="~assets/Drool.svg"
            v-else
          ></q-img>
          <span>droll</span>
        </li>
      </ul> -->
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
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Emojiselection',
  props: {
    sendValue: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const store = useStore()
    const recipe = computed(() => store.getters['recipe/recipes'])
    const detailedRecipes = computed(
      () => store.getters['recipe/getDetailedRecipes']
    )
    const  user = computed(() => {
        return store.getters['auth/getUser']
      })

    function getReaction() {
      if (recipe.value.length !== 0) {
        for (let i = 0; i < recipe.value.length; i++) {
          if (recipe.value[i].id === props.sendValue.id) {
            return recipe.value[i].reaction
          }
        }
      }else if (detailedRecipes.value !== null) {
        if (detailedRecipes.value.id === props.sendValue.id) {
          return detailedRecipes.value.recipeReaction?.reaction
        }
      }
    }
    const reaction = computed(() => getReaction())
    return {
      user,
      store,
      reaction,
    }
  },
  methods: {
    setData(val) {
      const countData = {
        recipe_id: this.sendValue.id,
        value: true,
      }
      if (val === 'Clear') {
        this.$store.commit('recipe/setReactionCount', countData)
      } else if (
        this.reaction !== 'LoveLike' &&
        this.reaction !== 'Hot' &&
        this.reaction !== 'Pizza' &&
        this.reaction !== 'Yummy' &&
        this.reaction !== 'Droll'
      ) {
        const countData = {
          recipe_id: this.sendValue.id,
          value: false,
        }
        if (val === 'LoveLike') {
          this.$store.commit('recipe/setReactionCount', countData)
        } else if (val === 'Hot') {
          this.$store.commit('recipe/setReactionCount', countData)
        } else if (val === 'Pizza') {
          this.$store.commit('recipe/setReactionCount', countData)
        } else if (val === 'Yummy') {
          this.$store.commit('recipe/setReactionCount', countData)
        } else if (val === 'Droll') {
          this.$store.commit('recipe/setReactionCount', countData)
        }
      }
      this.$emit('selectReaction', {
        value: val,
      })
    },
  },
}
</script>
<style lang="scss">
// $
.emoji-list {
  display: flex;
  padding: 0;
  margin: 0;
  width: 100%;
  justify-content: space-around;
  li {
    list-style: none;
    min-width: 50px;
    width: 20%;
    padding: 0 0px;
    text-transform: capitalize;
    .q-img {
      margin-bottom: 5px;
      height: 50px;
      img {
        height: 100%;
        width: auto;
      }
    }
    span {
      font-size: 16px;
      @extend .title-font;
    }
  }
}
.cus-popup{
  padding-top: 0;
  width: 100%;
}
</style>

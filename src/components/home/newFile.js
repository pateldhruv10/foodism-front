import { defineAsyncComponent, ref, computed } from 'vue';
import useDialog from 'src/composable/useDialog';
import { mapActions, useStore } from 'vuex';
import coverImage from 'src/composable/coverPhoto';

export default (await import('vue')).defineComponent({
name: 'RecipeCardBox',
props: {
item: {
type: Object,
required: true
}
},
components: {
'user-image': defineAsyncComponent(() => import(
/* webpackChunkName: "user-image" */
/* webpackMode: "lazy" */
'components/user/user-image.vue'
)
),
'reaction-box': defineAsyncComponent(() => import('components/common/reaction-box.vue')
),
'user-option': defineAsyncComponent(() => import('../common/user-option.vue')
),
'post-bottom': defineAsyncComponent(() => import('components/common/post-bottom.vue')
),
'emoji-selection': defineAsyncComponent(() => import('../common/emoji-selection.vue')
),
'share-popup': defineAsyncComponent(() => import('../common/share-popup.vue')
)
},
setup(props) {
const {
allpopup, currentFrom, currentField, sendValue, sendDisplayField, dialogClass, open,
} = useDialog();

const { getCoverPhoto } = coverImage();
const useroption = ref(false);
const store = useStore();
return {
getCoverPhoto,

isLoggedIn: computed(() => {
return store.getters['auth/isLoggedIn'];
}),
recipe: computed(() => {
return store.getters['recipe/getMyRecipes'];
}),
allpopup,
currentFrom,
currentField,
sendValue,
sendDisplayField,
dialogClass,
open,
useroption,
setValue(data) {
console.log(data);
this.allpopup = false;
this[`${data.field}`] = data.value;
},
bookmarkData: computed(() => {
// alert(props.item.cover_photo)
return {
id: props.item.id,
name: props.item.name,
image: props.item.cover_photo && props.item.cover_photo
? props.item.cover_photo
: null,
slug: props.item.slug
};
}),
share: computed(() => {
return {
type: 'recipe-details',
title: props.item.name,
images: props.item.cover_photo,
date: props.item.created_at,
slug: props.item.id
};
}),
user: computed(() => {
return store.getters['auth/getUser'];
}),
reactionBox: computed(() => {
return {
reactionCount: props.item.reactionCount ?? props.item.count.reactionCount ?? 0,
iMadeItCount: props.item.iMadeItCount ?? props.item.count.iMadeItCount ?? 0
};
})
};
},

methods: {
...mapActions('recipe', ['bookmarkRecipe', 'removeRecipeBookmark']),
// detailview(id){
//   this.$store.dispatch('recipe/detailedRecipe', id)
// },
isBookmarked() {
const ev = this.$store.state.recipe.fev_recipes;
return ev.find((c) => c.id == this.item.id);
},
reaction(data) {
const rectionData = {
recipe_id: this.item.id,
reaction: data.value
};
this.allpopup = false;
this.$store.commit('recipe/setReaction', rectionData);
this.$store.dispatch('recipe/recipeReaction', rectionData);
}
},

name: 'RecipeCards'
});

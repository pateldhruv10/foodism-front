import api from "../../apis/index.js";

const BLOG_LISTING_API = '/blog';


export async function getBlogListing({ commit }, data) {
  try {
    const res = await api.getWithParam(BLOG_LISTING_API, data);
    if (res.success) {
      // const recipe = getters.recipe;
      const ev = res.data;
      commit('setBlogs', ev);
      // LocalStorage.set('editRecipeData', ev)
      return res
    }
  } catch (err) {
    return err
  }
}



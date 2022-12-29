import { boot } from "quasar/wrappers";
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { DateTime } from "luxon";
import VueSocialSharing from 'vue-social-sharing';
export default boot(({ app, store }) => {
  if (store.getters['master/getCityOption'] === null || store.getters['master/getCityOption'].length === 0) {
    console.log('Fetching cities from boot file');
    store.dispatch('master/getCitiesApi');
  }

  if (store.getters['master/getPreferredFood'] === null || store.getters['master/getPreferredFood'].length === 0) {
    console.log('Fetching Food preference from boot file');
    store.dispatch('master/getFoodPreference');
  }

  if (store.getters['master/getPreferredCuisine'] === null || store.getters['master/getPreferredCuisine'].length === 0) {
    console.log('Fetching Cuisines from boot file');
    store.dispatch('master/getCuisines');
  }

  if (store.getters['master/getLanguages'] === null || store.getters['master/getLanguages'].length === 0) {
    console.log('Fetching Languages from boot file');
    store.dispatch('master/getLanguages');
  }

  if (store.getters['master/getCategories'] === null || store.getters['master/getCategories'].length === 0) {
    console.log('Fetching Categories from boot file');
    store.dispatch('master/getCategories');
  }

  if (store.getters['master/getdishTypeOption'] === null || store.getters['master/getdishTypeOption'].length === 0) {
    console.log('Fetching Dish Type from boot file');
    store.dispatch('master/getdishTypes');
  }

  if (store.getters['master/getDietCategoryOption'] === null || store.getters['master/getDietCategoryOption'].length === 0) {
    console.log('Fetching Diet Category from boot file');
    store.dispatch('master/getDietCat');
    store.dispatch('master/getUnits');
    store.dispatch('master/getServingTypes')
  }

  app.use(VueGoogleMaps, {
    load: {
      key: process.env.GOOGLE_MAP_API_KEY,
      libraries: "places",
    },
    installComponents: true,
    autobindAllEvents: true,
  });

  app.use(VueSocialSharing)

  app.mixin({
    methods: {
      imgUrl(pic) {
        return `~${pic}`;
      },
      capitalize(string) {
        return string ? string[0].toUpperCase() + string.slice(1) : '';
      },
      containsAll(arr1, arr2) {
        return arr2.every(arr2Item => arr1.indexOf(arr2Item) >= 0)
      },
      sameMembers(arr1, arr2) {
        return this.containsAll(arr1, arr2) && this.containsAll(arr2, arr1);
      },
      getHumanReadable(time) {
        return DateTime.fromISO(time).toRelative();
      },
      generateHeader() {
        return [
          { name: 'Accept', value: 'application/json' },
          { name: 'X-Authorization', value: process.env.API_SECRET },
          { name: 'Authorization', value: `Bearer ${store.getters['auth/getAccessToken']}` }
        ];
      },
      removeItem(array, index) {
        array.splice(index, 1);
        return array;
      },
      isBase64(str) {
        const base64 = /^[data]{4}[:]{1}/
        return base64.test(str)
      },

      // Common validations start
      required(val, fieldName = null, dependentField = true) {
        return dependentField ? (val && val.length > 0) || 'Please enter a ' + fieldName : false;
      },
      isEmail(val) {
        const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailRegex.test(val) || 'Please enter a valid email address';
      },
      isSpecialString(val) {
        const regex = /^[a-zA-Z0-9_.]+$/;
        return regex.test(val) || 'Please enter a valid string';
      },
      isNumber(val) {
        const regex = /^([0-9])+$/;
        return regex.test(val) || 'Please enter a only number';
      },
      isUrl(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return str !== null && str !== undefined ? pattern.test(str) || 'Please enter valid url' : true;
      },
      min(val, min, fieldName = null) {
        return val.length >= min || 'Please enter a minimum of ' + min + ' characters in ' + fieldName;
      },
      max(val, max, fieldName = null) {
        return val.length <= max || 'Please enter a maximum of ' + max + ' characters in ' + fieldName;
      },
      between(val, min, max) {
        return val.length >= min && val.length <= max || 'Please enter a value between ' + min + ' and ' + max + ' characters';
      }
      // Common validations end
    },
  });
});

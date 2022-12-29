import { getWithExpiry } from '../../utils/storage';

export default function () {
  return {
    drawer: false,
    categories : getWithExpiry('categories') ?? [], // image: require("assets/c1.jpg") default image

    foodPreference: getWithExpiry('foodPreferences') ?? [],
    cuisines: getWithExpiry('cuisines') ?? [],
    cities: getWithExpiry('cities') ?? [],
    dishTypes: getWithExpiry('dishTypes') ?? [],
    units: getWithExpiry('units') ?? [],
    servingTypes: getWithExpiry('servingTypes') ?? [],
    languages: getWithExpiry('languages') ?? [],
    dietCat:  getWithExpiry('dietCat') ?? [],
    search: null,
  }
}

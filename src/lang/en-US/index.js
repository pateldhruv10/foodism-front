import addRecipes from './add-recipes.js';
import auth from './auth.js';
import seller from './seller.js';
import userProfile from './user-profile.js';
import contest from './contest.js';
import common from './common.js';
import vlog from './vlog.js';
import event from './events.js';

export default {
  siteTitle: "Marketplace",
  general: {
    home: "Home",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    messages: {
      success: "Record created successfully",
    }
  },
  errors : {
    serverError: "There’s been a glitch. We’re not quite sure what went wrong. Please try again later.",
    notFound: "The requested resource was not found.",
    duplicateEntry: "Please check your input. This value is already in use.",
    sesstionExpired: "Your session has expired. Please login again."
  },
  label: {
    seeAll: "See All",
    skip: "Skip",
    submit: "Submit",
    save: "Save",
    edit: "Edit",
    sendOTP: "Send OTP",
    resendOTP: "Resend OTP",
    login: "Login",
    signup: "Signup",
    close: "Close",
    saveDraft: "Save as Draft",
    loginWith: "Login With",
    or: "OR",
    email: "Email",
    password: "Password"
  },
  follow: {
    followers:"Followers",
    following:"Following",
    subscriber: "Subscribers",
  },
  home: {
    exploreCuisine: "Explore by Cuisines",
    topPicks: "Top Picks for you",
    popularSellers: "Popular Sellers",
    byOccasions: "Explore by Occasions",
    popularFood: "Popular food near me",
    add: {
      recipe: "Recipes",
      vlog: "Vlog",
      vlogs: "Vlogs",
      event: "Host Event"
    },
    tab : {
      recipe: {
        all: "All Recipes",
        video: "Video Recipes"
      },
      event: {
        current: "Ongoing events",
        upcoming: "Upcoming events"
      }
    }
  },
  confirm:{
    message : 'Are you sure you want to delete this item?'
  },
  location:{
    confirmLocation: "Confirm Location",
    searchPlaceholder: "Search location",
    currentLocation: "Current Location",
  },
  seller: seller,
  authentication: auth,
  userProfile: userProfile,
  addRecipes: addRecipes,
  contest: contest,
  common: common,
  vlog: vlog,
  event: event,
}




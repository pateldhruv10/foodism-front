import functions from '../../apis/auth'
import { LocalStorage } from "quasar";
import { api } from 'src/boot/axios';
import Notify from 'src/boot/notification'

const SIGNUP = '/signup'
const LOGIN = '/login'
const RESEND_OTP = '/resend-otp'
const FOLLOWERS = '/followers'
const FOLLOWING = '/following'


export function sendOTP(context, data) {
  return new Promise((resolve, reject) => {
    let API = LOGIN;
    if (data.task == 'register') {
      API = SIGNUP;
    }

    functions.getOTP(API, data).then(res => {
      // Store api response in vuex
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function resendOTP(context, data) {
  return new Promise((resolve, reject) => {
    functions.getOTP(RESEND_OTP, data).then(res => {
      // Store api response in vuex
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function verifyOTP(context, data) {
  return new Promise((resolve, reject) => {
    functions.verifyOTP(data).then(res => {
      context.commit('setToken', res.data.token)
      followers()
      following()
      this.dispatch('event/fetchFevEvents')
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function socialLogin(context, data) {
  return new Promise((resolve, reject) => {
    functions.socialLogin(data).then(res => {
      context.commit('setToken', res.data.token)
      followers()
      following()
      this.dispatch('event/fetchFevEvents')
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function me({ commit, dispatch }) {
  return new Promise((resolve, reject) => {
    functions.me().then(res => {
      commit('setUser', res)

      dispatch('followers')
      dispatch('following')

      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function logout(context) {
  return new Promise((resolve, reject) => {
    functions.logout().then(res => {
      // alert(res)
      LocalStorage.remove('bookmarkedEvent')
      LocalStorage.remove('bookmarkedRecipes')
      LocalStorage.remove('vlogPreview')
      LocalStorage.remove('follow')
      LocalStorage.remove('following')
      LocalStorage.remove('followers')
      LocalStorage.remove('userFollowers')
      LocalStorage.remove('userFollowing')
      LocalStorage.remove('userData')
      context.commit('setToken', null);
      context.commit('setUser', null);
      context.commit('setFollowers', null);
      context.commit('setFollowing', null);

      this.$router.push({ name: 'web-home' })
      resolve(res)
    }).catch(err => {

      // Request made and server responded
      // console.log(err.response.data);
      // console.log(err.response.status);
      // console.log(err.response.headers);
      if (401 === err.response.status) {
        context.commit('setToken', null)
        context.commit('setUser', null)

        Notify.error('Session expired. Please login again.')
        this.$router.push({ name: 'index' })
      } else {
        // console.log(err.errors);
        Notify.error('Something went wrong while logging out')
      }
      reject(err)
    })
  })
}

export function followers(context) {
  return new Promise((resolve, reject) => {
    api.get(FOLLOWERS).then(res => {
      context.commit('setFollowers', res.data.data)
      resolve(res)

    }).catch(err => {
      reject(err)
    })
  })
}

export function following(context) {
  return new Promise((resolve, reject) => {
    api.get(FOLLOWING).then(res => {
      context.commit('setFollowing', res.data.data)
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function userFollowing(context, data) {
  return new Promise((resolve, reject) => {
    api.get(`/following/${data}`).then((res) => {
      context.commit('setUserFollowing', res.data.data)
    })
  })
}

export function userFollowers(context, data) {
  return new Promise((resolve, reject) => {
    api.get(`/followers/${data}`).then((res) => {
      context.commit('setUserFollowers', res.data.data)
    })
  })
}




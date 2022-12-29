import { api } from 'boot/axios';
import Notify from "src/boot/notification";

const VERIFY_OTP_URL = '/verification'

const VERIFY_SOCIAL_LOGIN_URL = '/auth/social-login'

export default {
  getOTP(url, data) {
    return new Promise((resolve, reject) => {
      api.post(url, data).then(res => {
        if(res.data.success) {
          Notify.success(res.data.message)
        } else {
          Notify.error(res.data.message)
        }
        resolve(res.data);
      }).catch(error => {
        if (error.response) {
          // Request made and server responded
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);

          let errorMessage = error.response.data.errors;

          Notify.error(errorMessage[0].message)
        } else if (error.request) {
          // The request was made but no response was received
          // console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message);
          Notify.error(error.message)
        }

        reject(error);
      })
    })
  },

  verifyOTP(data) {
    return new Promise((resolve, reject) => {
      api.post(VERIFY_OTP_URL, data).then(res => {
        console.log(res.data);
        if(res.data.success) {
          resolve(res.data);
        } else {
          Notify.error(res.data.message)
          resolve(res.data);
        }
      }).catch(err => {
        Notify.error('Something went wrong while verifying OTP')
        reject(err);
      })
    })
  },

  socialLogin(data) {
    return new Promise((resolve, reject) => {
      api.post(VERIFY_SOCIAL_LOGIN_URL, data).then(res => {
        console.log(res.data);
        if(res.data.success) {
          resolve(res.data);
        } else {
          Notify.error(res.data.message)
          resolve(res.data);
        }
      }).catch(err => {
        Notify.error('Something went wrong while verifying OTP')
        reject(err);
      })
    })
  },

  me() {
    return new Promise((resolve, reject) => {
      api.get('/me').then(res => {
        if(res.data.success) {
          resolve(res.data.data);
        } else {
          Notify.error(res.data.message)
          reject(res);
        }
      }).catch(err => {
        Notify.error('Something went wrong while getting user details')
        reject(err);
      })
    })
  },

  logout() {
    return new Promise((resolve, reject) => {
      api.post('/logout').then(res => {
        if(res.data.success) {
          resolve(res.data);
        } else {
          Notify.error(res.data.message)
          reject(res);
        }
      }).catch(err => {
        reject(err);
      })
    })
  }
}

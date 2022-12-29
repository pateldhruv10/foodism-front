import { api } from 'boot/axios'
import Notify from "boot/notification";
import { LocalStorage, Quasar } from 'quasar';

export default {
  get(url) {
    return new Promise((resolve, reject) => {
      api.get(url).then(res => {
        resolve(res.data)
      }).catch(error => {
        this.showApiError(error);
        reject(error)
      })
    })
  },

  getWithParam(url, params) {
    return new Promise((resolve, reject) => {
      api.get(url, { params: params }).then(res => {
        resolve(res.data)
      }).catch(error => {
        this.showApiError(error);
        reject(error)
      })
    })
  },

  post(url, data) {
    return new Promise((resolve, reject) => {
      api.post(url, data).then(res => {
        resolve(res.data)
      }).catch(error => {
        this.showApiError(error);

        reject(error);
      })
    })
  },

  put(url, data) {
    return new Promise((resolve, reject) => {
      api.put(url, data).then(res => {
        resolve(res.data)
      }).catch(error => {
        this.showApiError(error);

        reject(error);
      })
    })
  },

  delete(url, data) {
    return new Promise((resolve, reject) => {
      api.delete(url, { data: data }).then(res => {
        resolve(res.data)
      }).catch(error => {
        this.showApiError(error);

        reject(error);
      })
    })
  },

  showApiError(error) {
    if (error.response) {

      // Request made and server responded
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      if (error.response.status == 401) {
        LocalStorage.remove('access_token');
        LocalStorage.remove('user');
        Notify.error(
          Quasar.lang.props.errors.sesstionExpired
        );

        location.replace('/')
      } else if (error.response.status == 500) {
        Notify.error(
          Quasar.lang.props.errors.serverError
        );
      } else if (error.response.status == 404) {
        Notify.error(
          Quasar.lang.props.errors.notFound
        );
      }
      else {
        let errorMessage = error?.response?.data?.errors;
        if (errorMessage) {
          Notify.error(errorMessage[0].message);
        } else if (error?.response?.data?.code) {
          const code = error?.response?.data?.code;
          if (code == "ER_DUP_ENTRY") {
            Notify.error(
              Quasar.lang.props.errors.duplicateEntry
            );
          } else if (code == "E_ROW_NOT_FOUND") {
            Notify.error(Quasar.lang.props.errors.notFound);
          }
        }
      }

    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
      Notify.error("The request was made but no response was received");
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log("Error", error?.message);
      Notify.error(error.message);
    }
  },
}

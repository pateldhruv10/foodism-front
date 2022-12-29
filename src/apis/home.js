import api from './index'

const FETCH_EVENTS = '/event/list'

export function getEvents (data) {
  return new Promise((resolve, reject) => {
    api.getWithParam(FETCH_EVENTS, data).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err);
      reject(err)
    });
  });
}

import { LocalStorage } from 'quasar'
import { getCityNameFromId } from 'src/store/master/getters'

export function setUser(state, data) {
  if (data == null) {
    LocalStorage.remove('user')
  } else {
    // console.log("Type Of " + typeof data.city_id);
    // if (data.city_id != null && data.city_id != '' && data.city_id != undefined && typeof data.city_id !== 'object') {
    //   data.city_id = getCityNameFromId(state, data.city_id)
    // }

    LocalStorage.set('user', data)
  }
  state.user = LocalStorage.getItem('user')
}
export function removeImage(state, data) {
  let user = LocalStorage.getItem('user')

  user.images[data] = {}

  LocalStorage.set('user', user)
  state.user = LocalStorage.getItem('user')
}

export function setToken(state, data) {
  if (data == null) {
    LocalStorage.remove('access_token')
  } else {
    LocalStorage.set('access_token', data)
  }
  state.access_token = LocalStorage.getItem('access_token')
}
export function setFollowers(state, data) {
  LocalStorage.set('followers', data)
  state.followers = LocalStorage.getItem('followers')

}
export function setUserFollowers(state, data) {
  LocalStorage.set('userFollowers', data)
  state.userFollowers = LocalStorage.getItem('userFollowers')

}
export function setFollowing(state, data) {
  LocalStorage.set('following', data)
  state.following = LocalStorage.getItem('following')
}
export function setUserFollowing(state, data) {
  LocalStorage.set('userFollowing', data)
  state.userFollowing = LocalStorage.getItem('userFollowing')
}
export function setUserListFollowing(state, data) {
  for (var i in state.following) {
    console.log(state.following[i].id);
    if (state.following[i].id === data) {
      state.following.forEach((items, index, object) => {
        if (items.id == data) {
          object.splice(index, 1);
        }
      });
    }
  }
}
export function setUserListFollowers(state, data) {
  for (var i in state.followers) {
    if (state.followers[i].id === data) {
      state.followers.forEach((items, index, object) => {
        if (items.id == data) {
          object.splice(index, 1);
        }
      });
    }
  }
}
export function setUserData(state, data) {
  LocalStorage.set('userData', data)
  state.userData = LocalStorage.getItem('userData')
}

export function setMyFollowing(state, data) {
  console.log(data);
  const following = LocalStorage.getItem('following')
  following.push(data)
  LocalStorage.set('following', following)
  state.following = LocalStorage.getItem('following')
}
export function setUnfollow(state, data) {
  const following = LocalStorage.getItem('following')
  following.forEach((items, index, object) => {
    if (items.id == data) {
      object.splice(index, 1);
    }
  });
  LocalStorage.set('following', following)
  state.following = LocalStorage.getItem('following')
}



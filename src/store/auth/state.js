import { LocalStorage } from "quasar";
export default function () {
  return {
    user: [],
    userData: [],
    access_token: '',
    follow: LocalStorage.getItem('follow') ?? [],
    followers: LocalStorage.getItem('followers') ?? [],
    following: LocalStorage.getItem('following') ?? [],
    userFollowers: LocalStorage.getItem('userFollowers') ?? [],
    userFollowing: LocalStorage.getItem('userFollowing') ?? [],
    follower: []
  }
}

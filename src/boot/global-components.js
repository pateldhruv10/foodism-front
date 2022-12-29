import { boot } from 'quasar/wrappers'
import UserHead from 'src/components/user/user-head.vue'
import IsLogout from 'src/components/common/is-logout.vue'
import { videoPlayer } from 'vue-videojs7'


// Define the components globally
export default boot(async ({ app }) => {
  app.component('user-head', UserHead)
  app.component('is-logout', IsLogout)
  app.use(videoPlayer, {})
})

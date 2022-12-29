import { api }  from "src/boot/axios";
import { ref } from 'vue';
import { ImageCache } from 'capacitor-image-cache';

export default function profile() {
  const image = ref(null);

  const cache = new ImageCache();

  const defaultImage = ref(false);

  // const { value } = await cache.get({src:"someSrc"}) // checks if the image is in cache and returns the image if not download, store then return

  // const { value } = await cache.clear() // Clear entire cache returns a boolean

  // const { value } = await cache.clearItem({src:"someSrc"}) // Clear item cache returns a boolean

   // check if cache has item returns a boolean

  const getProfilePic = async (user_id) => {
    if(user_id) {
      const url = `user/profile-image/${user_id}`;

      await api.get(url).then(async(res) =>  {
        const { value } = await cache.get({src:res.data})
        image.value = value;
        // return cachedImage;
        // if(cachedImage)
        // image.value = res.data
      }).catch(() => {
        defaultImage.value = true;
        image.value = require('src/assets/images/profile-new.png')
      })
    } else {
      defaultImage.value = true;
      image.value = require('src/assets/images/profile-new.png')
    }

  }

  return { image, defaultImage, getProfilePic };
}

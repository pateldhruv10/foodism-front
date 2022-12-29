import { getServerImageUrl } from 'src/utils/server-asset';

export default function shareImage() {
  function getCoverImage(images) {
    return images?.find(it => it.is_cover_page == 1)?.image
  }
  function getProfileImage(images) {
    // console.log(images);
    // if(images.length > 2){
    //   return images?.map(it => getServerImageUrl(it.image_path))
    // }else{
      return images?.map(it => getServerImageUrl(it.image_path))
    // }
  }
  function getGalleryImages(images) {
    return images.map(item => { return getServerImageUrl(item) }) ?? [];
  }

  function showImage(sendValue) {
    const im = getCoverImage(sendValue.images);
    return getImg(im);
  }

  function GetUrl(type, slug) {
    return `https://beta.foodism.xyz/${type}/${slug}`;
  }

  function getImg(im) {
    if (im) {
      return getServerImageUrl(im);
    }
    return require('../assets/contest-winner.jpg');
  }

  return { showImage, GetUrl, getCoverImage, getImg, getGalleryImages, getProfileImage };
}

import shareImage from 'src/composable/shareImage'
const { getImg } = shareImage()

export default function coverImage(){
  function getCoverPhoto( img){
    // console.log(img)
    if(img && img.startsWith('/users')){
      return process.env.TEMP_ASSET_ENDPOINT + img.substring(1)
    }else if(img && img.startsWith('https://')){
      return img
    }else{
      return getImg(img)
    }
  }
  return {getCoverPhoto}
}

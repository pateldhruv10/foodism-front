export function getServerImageUrl(pic, callback) {
  if (isBase64(pic)) {
    return pic;
  } else {
    return pic !== null && pic !== undefined ? process.env.ASSET_URL + pic : callback;
  }
}

export function isBase64(str) {
  const base64 = /^[data]{4}[:]{1}/;
  return base64.test(str);
}

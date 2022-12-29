export default function rcounts() {
  const valtypes = function (item) {
    if (item > 999999) {
     return Math.floor(item / 1000000) + 'M'
    } else if (item > 9999) {
    return  Math.floor(item / 1000) + 'K'
    } else  {
     return item
    }
  }
  return {valtypes}
}

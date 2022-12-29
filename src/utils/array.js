export function sortArray(array, key) {
	array.sort( function( a, b ){
    return ( ( a[key] == b[key] ) ? 0 : ( ( a[key] > b[key] ) ? 1 : -1 ) );
  }.bind(this));

  return array;
}
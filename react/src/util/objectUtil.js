//ref: https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
/**
 * Function to reorder an item in an array to another location
 * @param {Array} arr Array to modify
 * @param {Integer} old_index Index you would like to move
 * @param {Integer} new_index Index you would like to move old_index to
 */
export const arrayMove = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
};

//ref: https://stackoverflow.com/questions/14743536/multiple-key-names-same-pair-value
/**
 * Function for being able to define objects with multiple keys per value
 * easily, e.g. const obj = {"key1, key2, key3": value}
 * @param {Object} obj Object to expand
 */
export const expandObj = (obj) => {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; ++i) {
      var key = keys[i],
          subkeys = key.split(/,\s?/),
          target = obj[key];
      delete obj[key];
      subkeys.forEach(function(key) { obj[key] = target; })
  }
  return obj;
}

/**
 * Uses a string as a key to search through an object and find a property.
 * E.g. the string "animalNoises.cat" would return "meow" on { animalNoises: { cat: "meow" }}
 * @param {Object} o The object to search through
 * @param {String} s The string to use as a key
 */
export const useStringAsKey = (o, s) => {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
          o = o[k];
      } else {
          return;
      }
  }
  return o;
}
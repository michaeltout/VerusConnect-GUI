//ref: https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another

import deepmerge from "./deepMerge";

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

//ref: https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
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

/**
 * Uses an array of properties (in parent -> child order) 
 * as a key to search through an object and add or edit an
 * element, assuming the property list correctly maps the object.
 * Returns the modified object.
 * 
 * @param {Object} o The object to edit or add to
 * @param {String[]} propList The property list
 * @param {any} value Any value to add into the object or replace an object value with
 */
export const editValueByKeyPath = (o, propList, value) => {
  if (propList.length === 1) {
		let newO = { ...o }
    delete newO[propList[0]]
    return { ...o, [propList[0]]: value }
	} else {
  	let newProps = propList.slice()
    const newProp = newProps.shift()
    
  	return {...o, [newProp]: editValueByKeyPath(o[newProp], newProps, value)}
  }
}

/**
 * Adds properties object 2 includes that object 1 may be missing into 
 * object 1 and returns the modified object
 * @param {Object} obj1 Object 1
 * @param {Object} obj2 Object 2
 */
export const addMerge = (obj1, obj2) => {
  const flatObj1 = flattenObjectProps(obj1);
  const flatObj2 = flattenObjectProps(obj2);
  let resObj = obj1;

  flatObj2.forEach(propertyList => {
    if (!flatObj1.includes(propertyList)) {
      const propertyArr = propertyList.split(".");
      let updateObj = propertyArr.reduce(function(
        accumulator,
        currentValue
      ) {
        return accumulator[currentValue];
      },
      obj2);

      propertyArr
        .slice()
        .reverse()
        .forEach((property, index) => {
          updateObj = { [property]: updateObj };
        });

      resObj = deepmerge(updateObj, resObj);
    }
  });

  return resObj;
}

/**
 * Uses an array of properties (in parent -> child order) 
 * as a key to search through an object and remove an
 * element, assuming the property list correctly maps the object.
 * Returns the modified object.
 * 
 * @param {Object} o The object to search through
 * @param {String[]} propList The property list
 */
const removeElementByProperties = (o, propList) => {
  if (propList.length === 1) {
		let newO = { ...o }
    delete newO[propList[0]]
    return newO
	} else {
  	let newProps = propList.slice()
    const newProp = newProps.shift()
    
  	return {...o, [newProp]: removeElementByProperties(o[newProp], newProps)}
  }
}

export const flattenObjectProps = (obj) => {
  const isNonEmptyObject = (val) =>
    val != null &&
    typeof val === "object" &&
    !Array.isArray(val) &&
    Object.values(val).length > 0;

  const addDelimiter = (a, b) => (a ? `${a}.${b}` : b);

  const paths = (obj = {}, head = "") => {
    return Object.entries(obj).reduce((product, [key, value]) => {
      let fullPath = addDelimiter(head, key);

      return isNonEmptyObject(value)
        ? product.concat([fullPath, ...paths(value, fullPath)])
        : product.concat(fullPath);
    }, []);
  };

  return paths(obj);
}

const mapNestedValues = (object, currentPath) => {
  let values = []

  for (let key in object) {
    if (typeof object[key] == 'object' && object[key] != null && !Array.isArray(object[key])) {
      values = values.concat(mapNestedValues(object[key], [...currentPath, key]))
    } else values.push({value: object[key], path: [...currentPath, key]})
  }

  return values
}

// Gets the nested values of an object as an array, recursively
export const mapObjectValues = (object) => mapNestedValues(object, [])

/**
 * Removes the risk of running into an unexpected "cannot get 'x' of undefined" error
 * when trying to access/deal with objects, by giving an object the properties of a 
 * predefiened "frame" object, and removing any unecessary properties.
 * @param {Object} schema 
 * @param {Object} obj 
 * @param {Function} ignore A function, that gets passed a string-key of every perceived 
 * unecesarry property. If it returns true, that string key will be deemed necesarry, and 
 * not removed.
 */
export const equalizeProperties = (schema, obj = {}, ignore = () => false) => {
  let objChanged = false
  let retObj = { ...obj }

  const flatLocal = flattenObjectProps(retObj)
  const flatDefault = flattenObjectProps(schema)
  
  const unecessaryKeys = flatLocal.filter(x => {
    return !flatDefault.includes(x) && !ignore(x)
  })

  if (unecessaryKeys.length > 0) {
    unecessaryKeys.forEach(propertyGroup => {
      if (useStringAsKey(retObj, propertyGroup) != null) {
        const propertyArray = propertyGroup.split('.')
        retObj = removeElementByProperties(retObj, propertyArray)
      }
    })

    objChanged = true
  }

  const missingKeys = flatDefault.filter(x => !flatLocal.includes(x))

  if (missingKeys.length > 0) {
    missingKeys.forEach(propertyGroup => {
      if (useStringAsKey(retObj, propertyGroup) == null) {
        retObj = addMerge(retObj, schema)
      }
    })

    objChanged = true
  }
  
  return {
    result: retObj,
    changed: objChanged,
    removed: unecessaryKeys,
    added: missingKeys
  }
}
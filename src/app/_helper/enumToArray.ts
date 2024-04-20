export function enumToArray(enumObj: any, checked = true, sorted = false) {
  const result = [];
  let enumObjCopy = enumObj;
  if (sorted) {
    enumObjCopy = {};
    Object.keys(enumObj)
      .sort()
      .forEach((key) => {
        enumObjCopy[key] = enumObj[key];
      });
  }
  for (const key in enumObjCopy) {
    if (enumObjCopy.hasOwnProperty(key)) {
      result.push({ key, value: enumObjCopy[key], error: false, checked });
    }
  }
  return result;
}

export function enumToArray(enumObj: any) {
  const result = [];
  let enumObjCopy = enumObj;
  enumObjCopy = {};
  Object.keys(enumObj)
    .sort()
    .forEach((key) => {
      enumObjCopy[key] = enumObj[key];
    });
  for (const key in enumObjCopy) {
    if (enumObjCopy.hasOwnProperty(key)) {
      result.push({ key, value: enumObjCopy[key] });
    }
  }
  return result;
}

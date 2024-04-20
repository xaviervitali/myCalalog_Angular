export function enumToArray(enumObj: any) {
  const result = [];
  for (const key in enumObj) {
    if (enumObj.hasOwnProperty(key)) {
      result.push({ key, value: enumObj[key], error: false });
    }
  }
  return result;
}

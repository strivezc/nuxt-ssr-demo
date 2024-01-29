export function validateMobile(str) {
  // const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  const reg = /^1\d{10}$/
  return reg.test(str)
}

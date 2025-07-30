function strAdd(str1, str2) {
  //
  let i = str1.length - 1;
  let j = str2.length - 1;
  let carry = 0;
  let result = [];
  if (i < j) {
    str1 = str1.padStart(j + 1, "0");
    i = j;
  } else if (j < i) {
    str2 = str2.padStart(i + 1, "0");
    j = i;
  }
  while (i >= 0 || carry > 0) {
    const digit1 = i >= 0 ? parseInt(str1[i], 10) : 0;
    const digit2 = i >= 0 ? parseInt(str2[i], 10) : 0;
    const sum = digit1 + digit2 + carry;
    result.unshift(sum % 10);
    carry = Math.floor(sum / 10);
    i--;
  }
  return result.join("");
}
console.log(strAdd("11", "99"));
// output: '2'
// input: strAdd('11', '99')
// output: '110'
// input: strAdd('11', '999999999999999999')

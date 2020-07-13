// Takes in an integet and checks it against a flag, returns true/false
export const checkFlag = (integer, flag) => {
  return (flag & integer) == flag
}
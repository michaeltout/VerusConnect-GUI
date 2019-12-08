export const isPrivate = (tx) => {
  if(tx.address) {
    if(tx.memo || (tx.address.length === 95 || tx.address.length === 78)){
      return true;
    }
  }
  else if (!tx.address) {
    return true
  }
  else {
    return false;
  }
}

export const decodeMemo = (memoEncoded) => {
  var j;
  var hexes = memoEncoded.match(/.{1,4}/g) || [];
  var memoDecoded = "";
  for(j = 0; j<hexes.length; j++) {
    const charCode = parseInt(hexes[j], 16)

    if (charCode) memoDecoded += String.fromCharCode(charCode)
  }

  return memoDecoded;
}

export const encodeMemo = (memo) => {
  var hex;
  var i;

  var result = "";
  for (i = 0; i < memo.length; i++) {
    hex = memo.charCodeAt(i).toString(16);
    result += ("000"+hex).slice(-4);
  }

  return result;
}
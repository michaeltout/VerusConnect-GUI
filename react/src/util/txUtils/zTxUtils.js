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
  try {
    return decodeURIComponent(memoEncoded.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'));;
  } catch(e) {
    return "??"
  }
}
import translate from '../translate/translate'

const checkForPlural = (term, time) => {
  if (time > 1 && time < 2){
    return (translate('TX_INFO.' + term));
  }
  else {
    return (translate('TX_INFO.' + term + 'S'));
  }
}

export const blocksToTime = (blocks) => {
  const years = ((blocks/60)/24)/356;
  const months = (years % 1) * 12;
  const days = (months % 1) * 30.4375;
  const hours = (days % 1) * 24;
  const minutes = (hours % 1) * 60;

  if (years < 1){
    if (months < 1){
    if (days < 1){
      if (hours < 1){
      if (minutes < 1){
        return('0 ' + translate('TX_INFO.MINUTES'));
      }
      else {
        return(Math.floor(minutes) + ' ' + checkForPlural('MINUTE', minutes));
      }
      }
      else {
        return(Math.floor(hours) + ' ' + checkForPlural('HOUR', hours) + ' ' + 
        Math.floor(minutes) + ' ' + checkForPlural('MINUTE', minutes));
      }
    }
    else {
      return(
        Math.floor(days) + ' ' + checkForPlural('DAY', days) + ' ' +
        Math.floor(hours) + ' ' + checkForPlural('HOUR', hours) + ' ' + 
        Math.floor(minutes) + ' ' + checkForPlural('MINUTE', minutes));
    }
    }
    else {
      return(
      Math.floor(months) + ' ' + checkForPlural('MONTH', months) + ' ' +
      Math.floor(days) + ' ' + checkForPlural('DAY', days) + ' ' +
      Math.floor(hours) + ' ' + checkForPlural('HOUR', hours) + ' ' + 
      Math.floor(minutes) + ' ' + checkForPlural('MINUTE', minutes));
    }
  }
  else {
    return(
      Math.floor(years) + ' ' + checkForPlural('YEAR', years) + ' ' + 
      Math.floor(months) + ' ' + checkForPlural('MONTH', months) + ' ' +
      Math.floor(days) + ' ' + checkForPlural('DAY', days) + ' ' +
      Math.floor(hours) + ' ' + checkForPlural('HOUR', hours) + ' ' + 
      Math.floor(minutes) + ' ' + checkForPlural('MINUTE', minutes));
  }
}
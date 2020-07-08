// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

export const timeConverter = (UNIX_timestamp, compact = false) => {
  if (UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
    var time = compact
      ? `${date}/${a.getMonth() + 1}/${year} ${hour + ":" + min + ":" + sec}`
      : date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  } else {
    return null;
  }
};

const checkForPlural = (term, time) => {
  if (time > 1 && time < 2){
    return term;
  }
  else {
    return term + 's';
  }
}

export const secondsToTime = (blocks) => {
  const years = (((blocks/60)/60)/24)/356;
  const months = (years % 1) * 12;
  const days = (months % 1) * 30.4375;
  const hours = (days % 1) * 24;
  const minutes = (hours % 1) * 60;

  if (years < 1){
    if (months < 1){
    if (days < 1){
      if (hours < 1){
      if (minutes < 1){
        return('0 ' + 'mins');
      }
      else {
        return(Math.floor(minutes) + ' ' + checkForPlural('min', minutes));
      }
      }
      else {
        return(Math.floor(hours) + ' ' + checkForPlural('hr', hours) + ' ' + 
        Math.floor(minutes) + ' ' + checkForPlural('min', minutes));
      }
    }
    else {
      return(
        Math.floor(days) + ' ' + checkForPlural('day', days) + ' ' +
        Math.floor(hours) + ' ' + checkForPlural('hr', hours) + ' ' + 
        Math.floor(minutes) + ' ' + checkForPlural('min', minutes));
    }
    }
    else {
      return(
      Math.floor(months) + ' ' + checkForPlural('mon', months) + ' ' +
      Math.floor(days) + ' ' + checkForPlural('day', days) + ' ' +
      Math.floor(hours) + ' ' + checkForPlural('hr', hours) + ' ' + 
      Math.floor(minutes) + ' ' + checkForPlural('min', minutes));
    }
  }
  else {
    return(
      Math.floor(years) + ' ' + checkForPlural('yr', years) + ' ' + 
      Math.floor(months) + ' ' + checkForPlural('mon', months) + ' ' +
      Math.floor(days) + ' ' + checkForPlural('day', days) + ' ' +
      Math.floor(hours) + ' ' + checkForPlural('hr', hours) + ' ' + 
      Math.floor(minutes) + ' ' + checkForPlural('min', minutes));
  }
}
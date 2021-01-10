function timeFormat(date_value) {
  const date = new Date(date_value);
  const year = leadingZeros(date.getFullYear(), 4);
  const month = leadingZeros(date.getMonth(), 2);
  const day = leadingZeros(date.getDate(), 2);
  const hour = leadingZeros(date.getHours(), 2);
  const minute = leadingZeros(date.getMinutes(), 2);

  return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}

function leadingZeros(n, digits) {
  let zero = "";
  n = n.toString();

  if (n.length < digits) {
    for (let i = 0; i < digits - n.length; i++) zero += "0";
  }
  return zero + n;
}

export function timeForToday(date_value) {
  const today = new Date();
  const timeValue = new Date(date_value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 7) {
    return `${betweenTimeDay}일전`;
  }

  return timeFormat(date_value).substring(5, 10);
}

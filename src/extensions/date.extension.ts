interface Date {
  addSeconds(seconds: number): Date;
  addSecondsInDate(date: Date, seconds: number): Date;
}

Date.prototype.addSeconds = function (seconds: number): Date {
  const actDate = new Date();
  actDate.setSeconds(actDate.getSeconds() + seconds);
  return actDate;
};

Date.prototype.addSecondsInDate = function (date: Date, seconds: number): Date {
  const actDate = new Date(date);
  actDate.setSeconds(actDate.getSeconds() + seconds);
  return actDate;
};

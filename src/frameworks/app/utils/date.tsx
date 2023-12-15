import { format, parse, parseJSON } from 'date-fns';
import { zonedTimeToUtc, toDate, formatInTimeZone } from 'date-fns-tz';

const DATE_FORMAT_DEFAULT = 'yyyy-MM-dd';
const DATE_TIME_FORMAT_DEFAULT = 'yyyy-MM-dd HH:mm:ss';
// export const TIMEZONE_BACKEND: string = process.env.REACT_APP_TIMEZONE_BACKEND as string;
// export const TIMEZONE_FRONTEND: string = process.env.REACT_APP_TIMEZONE_FRONTEND as string;
const TIMEZONE_DEFAULT: string = process.env.REACT_APP_TIMEZONE as string;

const formatDate = (date?: Date, pattern: string = DATE_FORMAT_DEFAULT) => {
  // return date == null ? date : format(date, pattern);
  return date == null ? date : formatInTimeZone(date, TIMEZONE_DEFAULT, pattern);
};
const formatDatetime = (date?: Date, pattern: string = DATE_TIME_FORMAT_DEFAULT) => {
  // return date == null ? date : format(date, pattern);
  return date == null ? date : formatInTimeZone(date, TIMEZONE_DEFAULT, pattern);
};
const parseDateToUtc = (obj: Date | string | number) => {
  const timezone: string = TIMEZONE_DEFAULT;
  let zonedDatetime = zonedTimeToUtc(obj, timezone);
  // console.debug('date - parseDateToUtc - zonedDatetime: ', zonedDatetime);
  // console.debug('date - parseDateToUtc - zonedDatetime.getTimezoneOffset: [' + Math.abs(zonedDatetime.getTimezoneOffset()) + ']');
  return zonedDatetime;
  // return parseJSON(obj);
  // return toDate(obj);
};

export {
  DATE_FORMAT_DEFAULT,
  DATE_TIME_FORMAT_DEFAULT,
  TIMEZONE_DEFAULT,
  formatDate,
  formatDatetime,
  parseDateToUtc,
}

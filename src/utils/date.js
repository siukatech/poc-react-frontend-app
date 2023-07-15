import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export const DATE_FORMAT_DEFAULT = 'yyyy-MM-dd';
export const DATE_TIME_FORMAT_DEFAULT = 'yyyy-MM-dd HH:mm:ss';

export const formatDate = (date) => {
  return date == null ? date : format(date, DATE_FORMAT_DEFAULT);
};
export const formatDatetime = (date) => {
  return date == null ? date : format(date, DATE_TIME_FORMAT_DEFAULT);
};
export const parseDateToUtc = (obj) => {
  return zonedTimeToUtc(obj);
};

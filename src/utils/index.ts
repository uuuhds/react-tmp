import dayjs from 'dayjs';

type TimeInput = string | dayjs.Dayjs;

export function formatYYYYMMDD(time: TimeInput) {
  return dayjs.isDayjs(time)
    ? time.format('YYYY-MM-DD')
    : dayjs(time).format('YYYY-MM-DD');
}

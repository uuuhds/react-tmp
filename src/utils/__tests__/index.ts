import dayjs from 'dayjs';
import { YYYYMMDD } from '@/consts';
import { formatYYYYMMDD } from '../index';

it('test formatYYYYMMDD function', () => {
  expect(formatYYYYMMDD('2022-12-31')).toBe('2022-12-31');
  expect(formatYYYYMMDD('2022-12-31 12:12:12')).toBe('2022-12-31');
  expect(formatYYYYMMDD(dayjs())).toBe(dayjs().format(YYYYMMDD));
});

import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/vi';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekday);
dayjs.locale('vi');

// Set mặc định múi giờ GMT+7
dayjs.tz.setDefault('Asia/Bangkok');

export const Format = {
  date: 'YYYY-MM-DD',
  dateForwardSlash: 'DD/MM/YYYY',
  month: 'YYYY-MM',
  year: 'YYYY',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  dateTimeExport: 'YYYYMMDD_HHmmss',
  dateMonth: 'DD/MM',
  dateIso: 'YYYY-MM-DDTHH:mm:ss',
  dateTimeHour: 'HH:mm DD-MM-YYYY',
  dateTimeToDate: 'HH:mm dddd [ngày] DD-MM-YYYY',
};

export const Formatter = {
  date: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.date)),
  dateForwardSlash: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateForwardSlash)),
  dateTime: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateTime)),
  dateTimeExport: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateTimeExport)),
  month: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.month)),
  year: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.year)),
  dateMonth: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateMonth)),
  stringToDateIso: (dateString?: string): Date | string => (!dateString ? dayjs().toISOString() : dayjs(dateString).toISOString()),
  dateIso: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateIso)),
  dateTimeHour: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateTimeHour)),
  dateTimeToDate: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateTimeToDate)),
};

export const formatNumberCurrency = (value: number) => {
  if (isNaN(value)) return '';
  return Intl.NumberFormat('ja-JP', {}).format(value);
};

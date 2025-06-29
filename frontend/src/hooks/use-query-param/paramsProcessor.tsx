/* eslint-disable @typescript-eslint/no-unused-vars */
import type {SorterResult} from 'antd/es/table/interface';
import dayjs, {Dayjs} from 'dayjs';

import {Format} from '../../helpers/format';

export const DateProcessor: SharedTypes.ParamProcessType<Dayjs | undefined> = {
  encode: (val?: string | Date | Dayjs) => (val ? (dayjs(val)?.format?.(Format.date) as any) : undefined),
  decode: (val?: string) => {
    try {
      return val ? dayjs(val, Format.date) : undefined;
    } catch (error) {
      // istanbul ignore next
      return undefined;
    }
  },
};

export const DateTimeProcessor: SharedTypes.ParamProcessType<Dayjs | undefined> = {
  encode: (val?: string | Date | Dayjs) => (val ? (dayjs(val)?.format?.(Format.dateTime) as any) : undefined),
  decode: (val?: string) => {
    try {
      return val ? dayjs(val, Format.date) : undefined;
    } catch (error) {
      // istanbul ignore next
      return undefined;
    }
  },
};

export const MonthProcessor: SharedTypes.ParamProcessType<Dayjs> = {
  encode: (val?: string | Date | Dayjs) => (val ? dayjs(val)?.format?.(Format.month) : (undefined as any)),
  decode: (val?: string) => {
    try {
      return val ? dayjs(val, Format.month) : (undefined as any);
    } catch (error) {
      // istanbul ignore next
      return undefined as any;
    }
  },
};

export const StringProcessor: SharedTypes.ParamProcessType<string> = {
  encode: (val?: any) => (val != undefined ? val + '' : ''),
  decode: (val?: any) => val,
};

export const BooleanProcessor: SharedTypes.ParamProcessType<boolean> = {
  encode: (val?: boolean) => (val != undefined && val ? 'true' : 'false'),
  decode: (val?: string) => val === 'true',
};

export const SorterProcessor: SharedTypes.ParamProcessType<SorterResult<any>[]> = {
  encode: (sorter?: SorterResult<any>[]): string => {
    const sorterQuery =
      (Array.isArray(sorter) ? sorter : [sorter])
        .filter((each: any) => each?.order != undefined)
        .sort((a: any, b: any) => (a?.field < b?.field ? 1 : a?.field > b?.field ? 1 : 0))
        .map((each: any) => `${each?.order === 'descend' ? '-' : ''}${each?.field}`)
        .join(',') || undefined;
    return sorterQuery as string;
  },
  decode: (sorterQuery?: string) => {
    const sorter: SorterResult<any>[] = sorterQuery?.split(',')?.map((each) => {
      const order = each[0] === '-' ? 'descend' : 'ascend';
      const field = each.replace(/^(\+|-)/, '');
      return {
        field,
        order,
      };
    }) as any;
    return sorter;
  },
};

export const processMap: Record<any, SharedTypes.ParamProcessType> = {
  date: DateProcessor,
  datetime: DateTimeProcessor,
  // number: NumberProcessor,
  // boolean: BooleanProcessor,
  string: StringProcessor,
};

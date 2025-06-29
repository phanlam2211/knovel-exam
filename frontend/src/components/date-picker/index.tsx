import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { Format } from '../../helpers/format';
import { useQueryParam } from '../../hooks/use-query-param';
import { StringProcessor } from '../../hooks/use-query-param/paramsProcessor';

export function DatePickerQuery(props: DatePickerProps & { hasDefault?: boolean; queryName?: string }) {
  const [validAt, setValidAt] = useQueryParam(props.queryName as any, StringProcessor as any);

  const onDateChange = async (value: any) => {
    setValidAt(dayjs(value).format((props.format as string) || Format.date));
  };

  return (
    <DatePicker
      value={validAt ? dayjs(validAt as any) : props.hasDefault ? dayjs() : undefined}
      allowClear={true}
      onChange={onDateChange}
      format={props.format || Format.date}
      {...props}
    />
  );
}

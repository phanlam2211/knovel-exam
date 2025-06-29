import { DatePicker, type DatePickerProps } from 'antd';
import dayjs from 'dayjs';

type DatePickerFormProps = {
  onchange?: (value: string) => void;
} & DatePickerProps;

export function DatePickerForm(props: DatePickerFormProps) {
  return (
    <DatePicker
      {...props}
      value={props.value ? dayjs(props.value) : null}
      onChange={(_, dateString) => {
        props.onChange?.(dateString as any, dateString);
      }}
      style={{ width: '100%' }}
      disabled={props.disabled}
      allowClear={props.allowClear}
      showTime={props?.showTime}
    />
  );
}

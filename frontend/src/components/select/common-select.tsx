import { Select } from 'antd';
import type { SelectProps } from 'antd/es/select';

export function CommonSelect(props?: SelectProps & { width?: number }) {
  return (
    <Select
      defaultValue={props?.defaultValue}
      allowClear={props?.allowClear}
      showSearch={true}
      dropdownStyle={{ minWidth: '300px' }}
      style={{ width: props?.width ? props.width : '100%' }}
      filterOption={(input, option) => (option?.label as unknown as string)?.toLowerCase().includes(input.toLowerCase())}
      {...props}
    />
  );
}

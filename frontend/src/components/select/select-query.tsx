import { Select } from 'antd';
import type { SelectProps } from 'antd/es/select';
import { StringProcessor } from '../../hooks/use-query-param/paramsProcessor';
import { useQueryParam } from '../../hooks/use-query-param';

export function CommonSelectQuery(
  props: SelectProps & {
    queryName?: string;
    width?: number;
    defaultValue?: string;
  },
) {
  const [queryValue, setQueryValue] = useQueryParam(props.queryName ?? '', StringProcessor as any, { resetPageQuery: true });
  return (
    <Select
      value={queryValue || props.defaultValue}
      defaultValue={props.defaultValue}
      allowClear={true}
      showSearch={true}
      style={{ width: props.width ? props.width : '100%' }}
      onChange={setQueryValue}
      filterOption={(input, option) => (option?.label as unknown as string)?.toLowerCase().includes(input.toLowerCase())}
      {...props}
    />
  );
}

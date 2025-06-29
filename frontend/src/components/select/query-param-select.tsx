/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useMemo} from 'react';
import {Select} from 'antd';
import type {SelectProps} from 'antd/es/select';
import useQueryParams from '../use-query-params';

const { Option } = Select;

type SelectOption = {
  label: string;
  value: string | number;
};

interface Props extends SelectProps {
  name: string; // Tên tham số trong URL
  options: SelectOption[]; // Các lựa chọn trong dropdown
  processor: any; // ParamProcessor để mã hóa và giải mã giá trị
  defaultValue?: string | number; // Giá trị mặc định nếu không có trong URL
  handleOnChange?: (value: string | number) => void;
  dependOnNames?: string[];
}

const QueryParamSelect: React.FC<Props> = ({ name, options, processor, defaultValue, dependOnNames = [], ...props }) => {
  // Sử dụng hook useQueryParam để đọc và cập nhật giá trị của query param
  const { getQueryParam, setQueryParams } = useQueryParams();
  const value = getQueryParam(name);

  const handleChange = (newValue: string | number) => {
    const queryParams: { [key: string]: string } = {
      [name]: newValue === defaultValue ? '' : ((newValue as string) ?? ''),
    };
    dependOnNames.forEach((depName) => {
      queryParams[depName] = '';
    });
    setQueryParams(queryParams);
  };

  const realValue: any = useMemo(() => {
    if ((value as string)?.includes(',')) {
      return (value as string).split(',');
    }
    return value ? String(value) : undefined;
  }, [value]);

  return (
    <Select {...props} value={realValue} onChange={handleChange} style={{ width: '100%' }}>
      {options.map((option) => (
        <Option key={option.value} disabled={option.value === 'all'} value={String(option.value)}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default QueryParamSelect;

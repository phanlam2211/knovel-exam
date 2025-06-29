import { Input, type InputProps } from 'antd';
import React, { useState } from 'react';
import useQueryParams from '../use-query-params';

interface Props extends InputProps {
  name: string; // Tên tham số trong URL
  processor: any; // ParamProcessor để mã hóa và giải mã giá trị
  defaultValue?: string | number; // Giá trị mặc định nếu không có trong URL
  placeholder?: string;
}

export const QueryParamInput = ({ name, ...props }: React.PropsWithChildren<Props>) => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const value = getQueryParam(name);

  const [realValue, setRealValue] = useState(value ?? '');

  const handleChange = (newValue: string) => {
    setRealValue(newValue);
  };

  return (
    <Input
      value={realValue ?? ''}
      onChange={(e) => handleChange(e.target.value)}
      {...props}
      onClear={() => setQueryParam(name, '')}
      onPressEnter={(e: any) => setQueryParam(name, e.target.value)}
    />
  );
};

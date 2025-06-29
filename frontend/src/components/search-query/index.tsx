import { Input } from 'antd';
import { useEffect, useState } from 'react';
import useQueryParams from '../use-query-params';

type SearchInputProps = {
  placeholder: string;
  name: string;
  defaultValue?: string;
};

const SearchInput = ({ placeholder, name }: SearchInputProps) => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const urlValue = getQueryParam(name) ?? '';
  const [realValue, setRealValue] = useState(urlValue);

  useEffect(() => {
    setRealValue(urlValue);
  }, [urlValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRealValue(e.target.value);
  };

  const handleSearch = (value: string) => {
    setQueryParam(name, value.trim());
  };

  return (
    <Input.Search
      placeholder={placeholder}
      name={name}
      enterButton='Tìm kiếm'
      allowClear
      value={realValue}
      onChange={handleChange}
      onSearch={handleSearch}
    />
  );
};

export default SearchInput;

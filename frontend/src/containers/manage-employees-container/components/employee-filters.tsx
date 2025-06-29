import { Col, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useQueryParams from '../../../components/use-query-params';

const { Search } = Input;

export const EmployeeFilters = () => {
  const params = useQueryParams();

  const handleSearch = (value: string) => {
    params.setQueryParams({ searchText: value, page: '1' });
  };

  return (
    <Col span={24}>
      <Search
        placeholder='Search employees by name or email...'
        allowClear
        enterButton={<SearchOutlined />}
        size='large'
        onSearch={handleSearch}
        defaultValue={params.getQueryParams().searchText}
        style={{ marginBottom: 16 }}
      />
    </Col>
  );
};
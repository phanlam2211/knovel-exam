import { Flex, Table, type TableProps } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { Typography } from 'antd/lib';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import type { AnyObject } from 'yup';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../../constants/pagination';
import { applyQueryParams } from '../../../untils';

export type BaseTableProps<T> = {
  total?: number;
  columns: any;
  dataSource: T[];
  useQueryParams?: boolean;
  leftPagination?: ReactNode;
  defaultState?: {
    page?: number;
    size?: number;
    sorter?: SorterResult<any>[];
  };
} & TableProps<T>;

export function BaseTable<T = AnyObject>({ total, ...props }: BaseTableProps<T>) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const size = searchParams.get('size');
  const onChange: TableProps<T>['onChange'] = (pagination, filters, sorter) => {
    let sortBy, sortOrder;
    if (Array.isArray(sorter)) {
      sortBy = sorter[0]?.field;
      sortOrder = sorter[0]?.order;
    } else {
      sortBy = sorter.field;
      sortOrder = sorter.order;
    }
    const sortOrderValue = sortOrder === 'ascend' ? 'ASC' : sortOrder === 'descend' ? 'DESC' : undefined;
    const params: Record<string, any> = {
      ...filters,
      page: String(pagination.current),
      size: String(pagination.pageSize),
    };
    if (sortBy && sortOrderValue) {
      params.sortBy = sortBy;
      params.sortOrder = sortOrderValue;
    } else {
      // Nếu không còn sort, xóa sortBy/sortOrder khỏi URL
      params.sortBy = undefined;
      params.sortOrder = undefined;
    }
    applyQueryParams(params, true, navigate, location);
  };

  return (
    <TableWrapper className='custom-table-wrapper'>
      <Table<T>
        pagination={{
          total: total,
          pageSize: size ? parseInt(size) : DEFAULT_PAGE_SIZE,
          current: page ? parseInt(page) : DEFAULT_PAGE_NUMBER,
          showSizeChanger: true,
          showTotal: (total) => (
            <TotalWrapper>
              {props.leftPagination}
              <TotalTypography>Total: {total}</TotalTypography>
            </TotalWrapper>
          ),
        }}
        scroll={{ x: 'max-content' }}
        {...props}
        bordered
        columns={props.columns}
        onChange={onChange as any}
      />
    </TableWrapper>
  );
}
const TableWrapper = styled.div`
  .ant-table-thead > tr > th {
    font-weight: 700 !important;
  }
`;

const TotalWrapper = styled(Flex)`
  align-items: center;
  height: 100%;
`;

const TotalTypography = styled(Typography)`
  font-weight: bold;
`;

import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd/es/select';
import { useCallback, useEffect, useRef, useState } from 'react';

type AsyncSearchSelectProps = SelectProps & {
  width?: number;
  fetchOptions?: (search: string, page: number) => Promise<{ data: any[]; total: number }>;
  defaultOptions?: any[];
};

export function AsyncSearchSelect(props: AsyncSearchSelectProps) {
  const [options, setOptions] = useState<any[]>(props.defaultOptions || []);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if more data is available
  const timeoutRef = useRef<any>(null);
  const selectRef = useRef<any>(null);

  const fetchMoreData = useCallback(
    (newPage: number, value: string) => {
      if (props.fetchOptions && hasMore && !loading) {
        setLoading(true);
        props
          .fetchOptions(value, newPage)
          .then(({ data, total }) => {
            setOptions((prevOptions) => [...prevOptions, ...data]);
            setPage(newPage);
            setHasMore(options.length + data.length < total); // Check if there are more results to load
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [hasMore, loading, props.fetchOptions],
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setOptions([]);
    setPage(1);
    setHasMore(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetchMoreData(1, value);
    }, 1000); // 1 second debounce
  };

  const handleDropdownScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // Trigger loading more when scrolled to the bottom
      fetchMoreData(page + 1, searchValue);
    }
  };

  useEffect(() => {
    if (props.fetchOptions) {
      props.fetchOptions('', 1).then(({ data, total }) => {
        setOptions(data);
        setPage(1);
        setHasMore(data.length < total); // Check if there are more results to load
      });
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [props.fetchOptions]);

  return (
    <Select
      ref={selectRef}
      defaultValue={props.defaultValue}
      allowClear={props.allowClear}
      showSearch={true}
      dropdownStyle={{ minWidth: '300px', overflow: 'hidden' }} // Set maxHeight and enable scrolling
      style={{ width: props.width ? props.width : '100%' }}
      filterOption={false}
      onSearch={handleSearch}
      value={searchValue}
      options={options}
      onPopupScroll={handleDropdownScroll}
      // notFoundContent={loading ? <Spin size="small" /> : <>Not found</>}
      dropdownRender={(menu) => (
        <div>
          {menu}
          {loading && hasMore && (
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <Spin size='small' />
            </div>
          )}
        </div>
      )}
      {...props}
    />
  );
}

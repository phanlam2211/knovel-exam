import { CaretDownOutlined } from '@ant-design/icons';
import { Checkbox, Divider, Dropdown, Input, type MenuProps, Space, theme, Typography } from 'antd';
import { defaultTo } from 'lodash';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { cloneElement, type CSSProperties, type ReactElement, useEffect, useMemo, useState } from 'react';

import { CommonButton } from '../button';
import { applyQueryParams, ensureArray } from '../../untils';

const { useToken } = theme;

export function MultipleSelectQuery({ queryName, label, options, width }: { queryName: string; label: string; options: any; width?: number }) {
  const { token } = useToken();
  const [searchParams] = useSearchParams();

  // Lấy giá trị của query parameter
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const queryValue = searchParams.get(queryName) || [];

    setSelectedKeys(ensureArray(queryValue));
    setSelectedValues(ensureArray(queryValue));
  }, [searchParams, open]);

  const items: MenuProps['items'] = useMemo(() => {
    const onCheckBoxChange = (e: any, value: string) => {
      if (e.target.checked) {
        setSelectedKeys([...selectedKeys, value]);
      } else {
        setSelectedKeys(selectedKeys.filter((key) => key !== value));
      }
    };

    return options
      ?.filter((item: any) => item.label.toLowerCase().includes(search?.toLowerCase()) || item.value.toLowerCase().includes(search?.toLowerCase()))
      ?.map((option: any) => {
        return {
          label: (
            <Checkbox checked={selectedKeys?.includes(option.value)} onChange={(e) => onCheckBoxChange(e, option.value)}>
              {option.label}
            </Checkbox>
          ),
          key: option.value,
        };
      });
  }, [options, open, selectedKeys, search]);

  const contentStyle: CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    width: 250,
  };

  const handleSubmit = () => {
    applyQueryParams({ [queryName]: defaultTo(selectedKeys, []) }, true, navigate, location);
    setOpen(false);
  };

  const onSearchChange = (e: any) => {
    setSearch(e.target.value);
    setSelectedKeys([]);
  };

  const labelRender = useMemo(() => {
    if (selectedValues) {
      const selectedItems = selectedValues?.length;
      if (selectedItems === 1) {
        return options.find((item: any) => item.value === selectedValues[0])?.label;
      } else if (selectedItems > 1) {
        return label + selectedItems + ' chọn';
      }
    }
    return label;
  }, [selectedValues, label, options]);

  const handleSelectAll = () => {
    setSelectedKeys(options.map((item: any) => item.value));
  };

  const handleDeSelectAll = () => {
    setSelectedKeys([]);
  };

  return (
    <div>
      <Dropdown
        open={open}
        menu={{ items }}
        dropdownRender={(menu) => {
          return (
            <div style={contentStyle}>
              <Space
                style={{
                  justifyContent: 'space-between',
                  display: 'flex',
                  padding: 8,
                }}
              >
                <CommonButton onClick={handleSelectAll}>Select all</CommonButton>
                <CommonButton onClick={handleDeSelectAll}>Unselect all</CommonButton>
              </Space>
              <Divider style={{ margin: 0 }} />
              <div style={{ padding: 8 }}>
                <Input placeholder='Tìm kiếm' onChange={onSearchChange} />
              </div>
              <Divider style={{ margin: 0 }} />
              {cloneElement(menu as ReactElement)}
              <Divider style={{ margin: 0 }} />
              <Space style={{ padding: 8, justifyContent: 'end', display: 'flex' }}>
                <CommonButton onClick={() => setOpen(false)}>Cancel</CommonButton>
                <CommonButton onClick={handleSubmit}>OK</CommonButton>
              </Space>
            </div>
          );
        }}
      >
        <Space
          onClick={() => {
            setSearch('');
            setOpen(true);
          }}
        >
          <CommonButton style={{ width: width || 200 }} onClick={(e) => e.preventDefault()}>
            <Typography style={{ width: '100%', display: 'flex' }}>{labelRender}</Typography>
            <CaretDownOutlined />
          </CommonButton>
        </Space>
      </Dropdown>
    </div>
  );
}

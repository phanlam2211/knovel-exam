import React from 'react';
import { type Control, Controller } from 'react-hook-form';
import { Select } from 'antd';
import type { SelectProps } from 'antd/es/select';

const { Option } = Select;

interface SelectFieldProps extends SelectProps {
  name: string;
  control: Control<any>;
  label?: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  rules?: any; // Validation rules for react-hook-form
}

export const FormSelect: React.FC<SelectFieldProps> = ({ name, control, label, options, placeholder, rules }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: 'block', marginBottom: 8 }}>{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <Select {...field} onChange={(value) => field.onChange(value)} placeholder={placeholder} value={field.value} style={{ width: '100%' }}>
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            {fieldState.error && <span style={{ color: 'red', fontSize: 12 }}>{fieldState.error.message}</span>}
          </>
        )}
      />
    </div>
  );
};

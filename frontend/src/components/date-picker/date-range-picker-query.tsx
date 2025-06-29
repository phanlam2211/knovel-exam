import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

import { useLocation, useNavigate } from 'react-router-dom';
import { applyQueryParams } from '../../untils';
import { Formatter } from '../../helpers/format';
import { useQueryParam } from '../../hooks/use-query-param';
import { StringProcessor } from '../../hooks/use-query-param/paramsProcessor';

const { RangePicker } = DatePicker;

export function CommonDateRangePickerQuery(props: RangePickerProps) {
  const [validFrom] = useQueryParam('valid_from', StringProcessor as any);
  const [validTo] = useQueryParam('valid_to', StringProcessor as any);

  const navigate = useNavigate();
  const location = useLocation();
  const onDateChange = async (value: any) => {
    if (!value) {
      applyQueryParams({ valid_from: undefined, valid_to: undefined }, true, navigate, location);
    } else {
      applyQueryParams(
        {
          valid_from: Formatter.date(value[0]),
          valid_to: Formatter.date(value[1]),
        },
        true,
        navigate,
        location,
      );
    }
  };
  return <RangePicker value={validFrom ? [dayjs(validFrom as any), dayjs(validTo as any)] : undefined} {...props} onChange={onDateChange} />;
}

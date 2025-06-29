import { debounce } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_PAGE_NUMBER } from '../constants/pagination';

type ParsedUrlQuery = Record<string, string | string[] | undefined>;
// Helper: Chuyển mọi giá trị thành array
export const ensureArray = (x: any, acceptInvalidValue = false) => {
  if (!acceptInvalidValue && [undefined, null, NaN].includes(x)) {
    return x;
  }
  return Array.isArray(x) ? x : [x];
};

// Helper: Định dạng số
export const convertNumberFormat = (value: number) => {
  return Intl.NumberFormat().format(value);
};

// Helper: Kiểm tra đối tượng
export const isObject = (o: any) => typeof o === 'object' && o !== null && !Array.isArray(o);

// Helper: Sắp xếp key trong đối tượng theo thứ tự chữ cái
export const sortObjectAttributes = (obj: any): any => {
  const sortedEntries = Object.entries(obj)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => (isObject(value) ? [key, sortObjectAttributes(value)] : [key, value]));
  return Object.fromEntries(sortedEntries);
};

// Helper: Chuyển query string thành object
export const parseQuery = (queryString: string): ParsedUrlQuery => {
  const query: ParsedUrlQuery = {};

  // Loại bỏ dấu ? nếu có trong query string
  const pairs = (queryString[0] === '?' ? queryString.substring(1) : queryString).split('&');

  for (const pair of pairs) {
    const [key, value] = pair.split('=');

    if (key) {
      // Thay thế dấu + thành %20 trước khi decode để tránh lỗi
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(value || '').replace(/\+/g, '%20');

      query[decodedKey] = decodedValue;
    }
  }

  return query;
};

// Helper: Kiểm tra object rỗng
export const isObjectEmpty = (obj: any) => Object.keys(obj).length === 0;

// Helper: Thử parse JSON an toàn
export const tryParse = (s: string): Record<string, any> | undefined => {
  try {
    return JSON.parse(s);
  } catch (err: any) {
    console.log('errr', err);
    return undefined;
  }
};

// Xử lý query params
export const applyParams = (
  params: Record<string, string | string[]>,
  navigate: ReturnType<typeof useNavigate>,
  location: ReturnType<typeof useLocation>,
  historyMethod: 'push' | 'replace' = 'push',
  options = {
    clearAll: false,
  },
) => {
  let nextQuery: ParsedUrlQuery = options.clearAll ? {} : { ...parseQuery(location.search) };
  Object.entries(params).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      delete nextQuery[key];
    } else {
      nextQuery[key] = value;
    }
  });

  nextQuery = sortObjectAttributes(nextQuery);

  const searchParams = new URLSearchParams(nextQuery as any).toString();
  const newPath = `${location.pathname}?${searchParams}`;

  if (historyMethod === 'replace') {
    navigate(newPath, { replace: true });
  } else {
    navigate(newPath);
  }
};

// Gọi debounce để điều chỉnh params
const _debouncedPushParams = debounce(
  (
    query: ParsedUrlQuery,
    navigate: ReturnType<typeof useNavigate>,
    location: ReturnType<typeof useLocation>,
    historyMethod: 'push' | 'replace' = 'push',
  ) => {
    const searchParams = new URLSearchParams(query as any).toString();
    const newPath = `${location.pathname}?${searchParams}`;
    if (historyMethod === 'replace') {
      navigate(newPath, { replace: true });
    } else {
      navigate(newPath);
    }
  },
  500,
);

// Thay đổi query params có debounce
export const debouncedApplyParams = (
  params: Record<string, string | string[]>,
  navigate: ReturnType<typeof useNavigate>,
  location: ReturnType<typeof useLocation>,
  historyMethod: 'push' | 'replace' = 'push',
  options = {
    clearAll: false,
  },
) => {
  let nextQuery: ParsedUrlQuery = options.clearAll ? {} : { ...parseQuery(location.search) };

  Object.entries(params).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      delete nextQuery[key];
    } else {
      nextQuery[key] = value;
    }
  });

  nextQuery = sortObjectAttributes(nextQuery);
  _debouncedPushParams(nextQuery, navigate, location, historyMethod);
};

// Áp dụng query params
export const applyQueryParams = (
  queries: ParsedUrlQuery = {},
  resetPage = true,
  navigate: ReturnType<typeof useNavigate>,
  location: ReturnType<typeof useLocation>,
) => {
  const params = { ...parseQuery(location.search), ...queries };
  if (resetPage) {
    params['page'] = String(DEFAULT_PAGE_NUMBER);
  }
  applyParams(params as Record<string, string>, navigate, location, 'push');
};

// Chuyển đổi array params
export const convertQueryArrayParams = (params: string | string[] | number | number[] | undefined, isBoolParams?: boolean): string | undefined => {
  if (!params) return undefined;
  if (isBoolParams && (params as string[])?.length === 2) return undefined;
  return ensureArray(params).join(',');
};

import { useSearchParams } from 'react-router-dom';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Chuyển đổi query params sang object để dễ sử dụng
  const getQueryParams = () => {
    const params: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  // Lấy giá trị của 1 key cụ thể
  const getQueryParam = (key: string) => searchParams.get(key);

  const setQueryParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };
  const setQueryParams = (params: { [key: string]: string | null }) => {
    const newParams = new URLSearchParams(searchParams);
    Object.keys(params).forEach((key) => {
      if (params[key] === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, params[key] as string);
      }
    });
    setSearchParams(newParams);
  };
  return {
    getQueryParams,
    getQueryParam,
    setQueryParam,
    setQueryParams,
  };
};

export default useQueryParams;

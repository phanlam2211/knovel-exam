import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

type Props = {
  schema: any;
};

export const useHookForm = ({ schema }: Props) => {
  const methods = useForm<any>({
    resolver: yupResolver(schema) as any,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    getValues,
    setError,
    setValue,
    control,
    trigger,
  } = methods;

  return {
    reset,
    setError,
    setValue,
    handleSubmit,
    getValues,
    isValid,
    isDirty,
    errors,
    methods,
    control,
    trigger,
  };
};

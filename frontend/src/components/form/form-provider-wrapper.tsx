import React from 'react';
import { FormProvider } from 'react-hook-form';

type PropsFormProviderProps = {
  methods: any;
};

export const FormProviderWrapper = ({ children, methods }: React.PropsWithChildren<PropsFormProviderProps>) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  );
};

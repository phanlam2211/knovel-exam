declare global {
  // eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
  declare module SharedTypes {
    export { ParamProcessType };
  }
}

export type ParamProcessType<T = any> = {
  encode: (val?: T) => string;
  decode: (val?: string) => T;
};

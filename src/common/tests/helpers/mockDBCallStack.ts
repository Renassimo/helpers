const mockDBCallStack = (schema: string, value: object) => {
  const splitted: string[] = schema.split('.');
  const result = splitted.reduceRight(
    // @ts-ignore
    (acc: (never[] | null)[], part: string) => {
      const [funcObj, funcs] = acc;
      const name = part.split('(')[0];

      const func = jest.fn(() => funcObj ?? value);
      // @ts-ignore
      return [{ [name]: func }, [func, ...funcs]];
    },
    [null, []]
  );
  return result;
};

// const schema = 'collection().doc().collection().doc().get()';

export default mockDBCallStack;

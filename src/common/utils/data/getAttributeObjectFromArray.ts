export const getAttributeObjectFromArray = <A, AA extends Record<string, any>>(
  array: { id: string; attributes: A }[],
  additionalAttributes?: AA
): {
  [key: string]: {
    id: string;
    attributes: A;
  };
} =>
  // todo make better algorithm
  array?.reduce(
    (result, item) => ({
      ...result,
      [item.id]: {
        ...item,
        attributes: { ...item.attributes, ...(additionalAttributes ?? {}) },
      },
    }),
    {}
  );

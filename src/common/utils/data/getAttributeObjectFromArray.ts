export const getAttributeObjectFromArray = <A>(
  array: { id: string; attributes: A }[]
): {
  [key: string]: {
    id: string;
    attributes: A;
  };
} => array?.reduce((result, item) => ({ ...result, [item.id]: item }), {});

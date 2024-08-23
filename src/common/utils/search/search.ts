const search = (value: string | null, query: string) => {
  if (query === '') return true;
  if (!value) return false;
  return value.search(new RegExp(query, 'i')) >= 0;
};

export default search;

const deleteCategory = async (
  gameId: string,
  id: string
): Promise<Record<string, never>> => {
  const response = await fetch(
    `/api/gameMaps/games/${gameId}/categories/${id}`,
    {
      method: 'DELETE',
    }
  );

  const responseData = await response.json();

  if (!response.ok) throw responseData?.error;

  return {};
};

export default deleteCategory;

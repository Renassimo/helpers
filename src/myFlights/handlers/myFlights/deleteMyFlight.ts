import NotionService from '@/common/services/notion';

const deleteMyFlight = async (notionService: NotionService, id: string) => {
  const { ok, data } = await notionService.updatePage(id, { archived: true });

  if (ok)
    return {
      status: 204,
      responseBody: {},
    };
  return { status: data?.status, responseBody: { error: data } };
};

export default deleteMyFlight;

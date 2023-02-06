class NotionService {
  token!: string;
  baseURL!: string;

  constructor(token: string) {
    this.token = token;
    this.baseURL = process.env.NOTION_API_BASE_URL ?? '';
  }

  queryDatabase = (dataBaseID: string, args: object) =>
    fetch(`${this.baseURL}/databases/${dataBaseID}/query`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(args),
    });

  updatePage = (pageId: string, args: Record<string, never>) =>
    fetch(`${this.baseURL}/pages/${pageId}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(args),
    });

  retrieveBlockChildren = (blockId: string) =>
    fetch(`${this.baseURL}/blocks/${blockId}/children`, {
      method: 'GET',
      headers: this.headers,
    });

  private get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-02-22',
    };
  }
}

export default NotionService;

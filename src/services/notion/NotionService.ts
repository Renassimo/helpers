class NotionService {
  token!: string;
  baseURL!: string;

  constructor(token: string) {
    this.token = token;
    this.baseURL = process.env.NOTION_API_BASE_URL ?? '';
  }

  queryDatabase = async (dataBaseID: string, args: object) => {
    const response = await fetch(
      `${this.baseURL}/databases/${dataBaseID}/query`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(args),
      }
    );
    const data = await response.json();
    return { response, data };
  };

  updatePage = async (pageId: string, args: object) => {
    const response = await fetch(`${this.baseURL}/pages/${pageId}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(args),
    });
    const data = await response.json();
    return { response, data };
  };

  retrieveBlockChildren = async (blockId: string) => {
    const response = await fetch(`${this.baseURL}/blocks/${blockId}/children`, {
      method: 'GET',
      headers: this.headers,
    });
    const data = await response.json();
    return { response, data };
  };

  private get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-02-22',
    };
  }
}

export default NotionService;

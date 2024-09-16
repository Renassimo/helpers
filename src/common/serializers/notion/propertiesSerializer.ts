class NotionPropertiesSerializer<T extends { [key: string]: any }> {
  attributes: T;

  constructor(attributes: T) {
    this.attributes = attributes;
  }

  getRichText = (notionKey: string, attributeKey: string) => {
    const content = this.attributes[attributeKey];
    return content
      ? {
          [notionKey]: {
            type: 'rich_text',
            rich_text: [
              {
                text: { content },
              },
            ],
          },
        }
      : {};
  };

  getDate = (notionKey: string, attributeKey: string) => {
    const content = this.attributes[attributeKey];
    return content
      ? {
          [notionKey]: {
            date: { start: content },
          },
        }
      : {};
  };

  getSelect = (notionKey: string, attributeKey: string) => {
    const content = this.attributes[attributeKey];
    return content
      ? {
          [notionKey]: { select: { name: content } },
        }
      : {};
  };

  getUrl = (notionKey: string, attributeKey: string) => {
    const content = this.attributes[attributeKey];
    return content
      ? {
          [notionKey]: { url: content },
        }
      : {};
  };

  getUrlCover = (attributeKey: string) => {
    const content = this.attributes[attributeKey];
    return content
      ? {
          cover: { type: 'external', external: { url: content } },
        }
      : {};
  };

  getNumber = (notionKey: string, attributeKey: string) => {
    const content = this.attributes[attributeKey];
    return content
      ? {
          [notionKey]: { number: Number(content) },
        }
      : {};
  };

  getName = (attributeKey: string) => {
    const content = this.attributes[attributeKey];
    return content
      ? {
          Name: {
            title: [
              {
                text: {
                  content,
                },
              },
            ],
          },
        }
      : {};
  };
}

export default NotionPropertiesSerializer;

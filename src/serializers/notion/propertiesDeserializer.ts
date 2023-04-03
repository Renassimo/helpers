import { NotionProperties, NotionResult } from '@/types/notion';

class NotionPropertiesDeserializer {
  result: NotionResult;
  id: string;
  url: string;
  properties: NotionProperties;

  constructor(result: NotionResult) {
    this.result = result;
    this.id = result.id;
    this.url = result.url;
    this.properties = result.properties;
  }

  private getProperty(propertyName: string) {
    return this.properties?.[propertyName];
  }

  private getAttribute(value: any) {
    return value ?? null;
  }

  getTextAttribute(propertyName: string, isTitle = false) {
    const property = this.getProperty(propertyName);
    return this.getAttribute(
      property?.[isTitle ? 'title' : 'rich_text']?.[0]?.plain_text
    );
  }

  getSelectAttribute(propertyName: string) {
    const property = this.getProperty(propertyName);
    return this.getAttribute(property?.select?.name);
  }

  getDateAttribute(propertyName: string) {
    const property = this.getProperty(propertyName);
    return this.getAttribute(property?.date?.start);
  }

  getCheckboxAttribute(propertyName: string) {
    const property = this.getProperty(propertyName);
    return this.getAttribute(property?.checkbox);
  }

  getUrlAttribute(propertyName: string) {
    const property = this.getProperty(propertyName);
    return this.getAttribute(property?.url);
  }
}

export default NotionPropertiesDeserializer;

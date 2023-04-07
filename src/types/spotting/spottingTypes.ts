export interface SpottedPlaneApiDataAttributes {
  airplaneName: string | null;
  cn: string | null;
  carrier: string | null;
  firstFlight: string | null;
  flown: boolean;
  groupPost: boolean;
  manufacturer: string | null;
  model: string | null;
  modelled: boolean;
  name: string | null;
  photosUrl: string | null;
  place: string | null;
  planespottersUrl: string | null;
  registration: string | null;
  spottedDate: string | null;
  url: string;
  photoUrl: string | null;
}

export interface SpottedPlaneApiData {
  id: string;
  attributes: SpottedPlaneApiDataAttributes;
}

export interface SpottedPlaneDescriptionAttributes {
  description: string;
  hashtags: string;
  newFirstFlight?: string;
  groupName?: string;
  groupDescription?: string;
  groupHashtags?: string;
}

export interface SpottedPlaneDescription {
  id: string;
  attributes: SpottedPlaneDescriptionAttributes;
}

type SpottedPlaneProviderDataAttributes = SpottedPlaneApiDataAttributes &
  SpottedPlaneDescriptionAttributes;

export interface SpottedPlaneProviderData
  extends SpottedPlaneProviderDataAttributes {
  id: string;
}

export interface SpottedPlaneGroup {
  'Group post': { checkbox: boolean };
  'Group text': {
    type: 'rich_text';
    rich_text: { text: { content: string } }[];
  };
  Group: { select: { name: string } };
}

export interface SpottedPlaneFirstFlight {
  'First flight': {
    date: { start: string };
  };
}

export interface SpottedPlaneSerializedDescription {
  id: string;
  body: {
    icon: { type: string; emoji: string };
    properties: {
      'Ready to publish': {
        checkbox: boolean;
      };
      Text: {
        type: string;
        rich_text: { text: { content: string } }[];
      };
      firstFlight?: SpottedPlaneFirstFlight;
      group?: SpottedPlaneGroup;
    };
  };
}

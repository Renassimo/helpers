export interface SpottedPlane {
  id: string;
  attributes: {
    airplaneName: string;
    cn: string;
    carrier: string;
    firstFlight: string;
    flown: boolean;
    groupPost: boolean;
    manufacturer: string;
    model: string;
    modelled: boolean;
    name: string;
    photosUrl: string;
    place: string;
    planespottersUrl: string;
    registration: string;
    spottedDate: string;
    url: string;
    photoUrl: string;
  };
}

export interface SpottedPlaneDescription {
  id: string;
  attributes: {
    description: string;
    hashtags: string;
    newFirstFlight?: string;
    groupName?: string;
    groupDescription?: string;
    groupHashtags?: string;
  };
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

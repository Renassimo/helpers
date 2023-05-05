import { SpottedPlaneApiDataAttributes } from '@/types/spotting';

export const mockedSpottedPlaneApiDataAttributesNullish: SpottedPlaneApiDataAttributes =
  {
    airplaneName: null,
    cn: null,
    carrier: null,
    firstFlight: null,
    flown: false,
    groupPost: false,
    manufacturer: null,
    model: null,
    modelled: false,
    name: null,
    photosUrl: null,
    place: null,
    planespottersUrl: null,
    registration: null,
    spottedDate: null,
    url: '',
    photoUrl: null,
  };

export const mockedSpottedPlaneApiDataAttributesTruthy: SpottedPlaneApiDataAttributes =
  {
    airplaneName: 'الفديريات',
    cn: '007',
    carrier: 'Qatar Airways',
    firstFlight: '2015-01-21',
    flown: true,
    groupPost: true,
    manufacturer: 'Airbus',
    model: 'A350-900',
    modelled: true,
    name: 'Qatar Airways A350-900 A7-ALB',
    photosUrl: 'https://cloud.mail.ru/public/',
    place: 'DOH/OTHH',
    planespottersUrl: 'https://www.planespotters.net/',
    registration: 'A7-ALB',
    spottedDate: '2015-12-27',
    url: 'https://www.notion.so/',
    photoUrl: 'https://file.notion.so/',
  };

export const mockedSpottedPlaneApiDataAttributesFalsy: SpottedPlaneApiDataAttributes =
  {
    airplaneName: 'Franek',
    cn: '35942',
    carrier: 'LOT',
    firstFlight: '2014-03-10',
    flown: false,
    groupPost: false,
    manufacturer: 'Boeing',
    model: '787-8',
    modelled: false,
    name: 'LOT 787-8 SP-LRF',
    photosUrl: 'https://cloud.mail.ru/public/',
    place: 'WAW/EPWA',
    planespottersUrl: 'https://www.planespotters.net/',
    registration: 'SP-LRF',
    spottedDate: '2022-02-02',
    url: 'https://www.notion.so/',
    photoUrl: 'https://file.notion.so/',
  };

export const mockedSpottedPlaneApiDataAttributesEmpty: SpottedPlaneApiDataAttributes =
  {
    airplaneName: '',
    cn: '',
    carrier: '',
    firstFlight: '',
    flown: false,
    groupPost: false,
    manufacturer: '',
    model: '',
    modelled: false,
    name: '',
    photosUrl: '',
    place: '',
    planespottersUrl: '',
    registration: '',
    spottedDate: '',
    url: '',
    photoUrl: '',
  };

export const mockedSpottedPlaneApiDataAttributesMixed: SpottedPlaneApiDataAttributes =
  {
    airplaneName: null,
    cn: '9444',
    carrier: 'Wizz Air',
    firstFlight: '202-07-23',
    flown: true,
    groupPost: false,
    manufacturer: 'Airbus',
    model: 'A321neo',
    modelled: false,
    name: '',
    photosUrl: 'https://cloud.mail.ru/public/',
    place: 'AQJ/QJAQ',
    planespottersUrl: 'https://www.planespotters.net/',
    registration: 'HA-LVK',
    spottedDate: null,
    url: 'https://www.notion.so/',
    photoUrl: '',
  };

import { LineWord, SpottedPlaneProviderData } from '@/types/spotting';

import {
  convertText,
  insHash,
  insRHash,
  freighters,
  specialHashTags,
} from '@/utils/spotting';
import { formatFromNotionDate } from '@/utils/dayjs';

const withEnter = (words: LineWord[]) =>
  words.find((word: LineWord) => !!word) ? [...words, '\n'] : words;

export const getDescriptionLines = (data: SpottedPlaneProviderData) => {
  const {
    manufacturer,
    model,
    carrier,
    airplaneName,
    registration,
    cn,
    firstFlight,
    newFirstFlight,
    place,
    spottedDate,
    flown,
  } = data;

  const acceptedFirstFlight = firstFlight ?? newFirstFlight;
  const modelConverted = model && convertText(model);
  const cnConverted = cn && convertText(cn);
  const modelCnHashTag =
    modelConverted &&
    cnConverted &&
    insHash(`${modelConverted}_${cnConverted}`);
  const freighter = modelConverted && freighters[modelConverted];
  const freighterHashtag =
    freighter && cnConverted && insHash(`${freighter}_${cnConverted}`);

  return [
    [manufacturer, model, carrier],
    [airplaneName],
    [registration, cn && `(cn ${cn})`],
    [
      acceptedFirstFlight
        ? `First flight ${formatFromNotionDate(acceptedFirstFlight)}`
        : null,
    ],
    [place, spottedDate ? formatFromNotionDate(spottedDate) : null],
    [modelCnHashTag],
    [freighterHashtag],
    [flown && insHash('renassimo_flown')],
  ];
};

export const getHashtagLines = (data: SpottedPlaneProviderData) => {
  const { manufacturer, model, carrier, place, spottedDate, modelled } = data;

  const convertedManufacturer = convertText(manufacturer);
  const convertedModel = convertText(model);
  const convertedCarrier = convertText(carrier);
  const convertedPlace = convertText(place, '_');

  const isSpotted = spottedDate || place;

  const { avrTag: avrModelTag = null, commonTag: commonModelTag = null } =
    convertedModel ? specialHashTags[convertedModel] ?? {} : {};
  const { avrTag: avrCarrierTag = null, commonTag: commonCarrierTag = null } =
    convertedCarrier ? specialHashTags[convertedCarrier] ?? {} : {};

  return [
    withEnter([
      insRHash(convertedModel),
      insRHash(convertedManufacturer),
      avrModelTag,
      avrCarrierTag,
      insRHash(convertedCarrier),
      insRHash(convertedPlace),
    ]),
    withEnter([isSpotted ? insHash('renassimo_spotted') : null]),
    withEnter([modelled ? insHash('renassimo_modelled') : null]),
    withEnter([
      insHash(convertedManufacturer),
      insHash(convertedModel),
      commonModelTag,
      commonCarrierTag,
      insHash(convertedCarrier),
    ]),
    [
      '#spotting #aviation #avgeek #flywithme #planes #jets #jetlovers',
      isSpotted && '#kznspotting #waw #epwa #wawspotting #warsawspotting',
      modelled &&
        '#aviamodel #aviamodelling #modelkit #scalemodel #plasticmodel #revell #zvezdamodels',
    ],
  ];
};

import { LineWord, SpottedPlaneProviderData } from '@/spotting/types';

import {
  convertText,
  insHash,
  insRHash,
  freighters,
  specialHashTags,
} from '@/spotting/utils';
import { formatFromNotionDate } from '@/common/utils/dayjs';
import { Commons } from '@/spotting/utils/commons';

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

  const formattedCn = cn && `(cn ${cn})`;
  const formattedFirstFlight = acceptedFirstFlight
    ? `First flight ${formatFromNotionDate(acceptedFirstFlight)}`
    : null;
  const formattedSpottedDate = spottedDate
    ? formatFromNotionDate(spottedDate)
    : null;
  const flownHashtag = flown && insHash('renassimo_flown');

  return [
    [manufacturer, model, carrier],
    [airplaneName],
    [registration, formattedCn],
    [formattedFirstFlight],
    [place, formattedSpottedDate],
    [modelCnHashTag],
    [freighterHashtag],
    [flownHashtag],
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

  const convertedModelRTag = insRHash(convertedModel);
  const convertedManufacturerRTag = insRHash(convertedManufacturer);
  const convertedCarrierRTag = insRHash(convertedCarrier);
  const convertedPlaceRTag = insRHash(convertedPlace);

  const isSpottedTag = isSpotted ? insHash('renassimo_spotted') : null;
  const modelledTag = modelled ? insHash('renassimo_modelled') : null;

  const convertedManufacturerTag = insHash(convertedManufacturer);
  const convertedModelTag = insHash(convertedModel);
  const convertedCarrierTag = insHash(convertedCarrier);

  const commonTags =
    '#spotting #aviation #avgeek #flywithme #planes #jets #jetlovers';
  const isSpottedCommonTags =
    isSpotted && '#kznspotting #waw #epwa #wawspotting #warsawspotting';
  const modelledCommonTags =
    modelled &&
    '#aviamodel #aviamodelling #modelkit #scalemodel #plasticmodel #revell #zvezdamodels';

  return [
    withEnter([
      convertedModelRTag,
      convertedManufacturerRTag,
      avrModelTag,
      avrCarrierTag,
      convertedCarrierRTag,
      convertedPlaceRTag,
    ]),
    withEnter([isSpottedTag]),
    withEnter([modelledTag]),
    withEnter([
      convertedManufacturerTag,
      convertedModelTag,
      commonModelTag,
      commonCarrierTag,
      convertedCarrierTag,
    ]),
    [commonTags, isSpottedCommonTags, modelledCommonTags],
  ];
};

export const getFirstSelectedDescriptionLines = (
  descriptionLines: LineWord[][],
  commons: Commons
) => {
  const { isCommonCarrierModel, isCommonPlane, isCommonPlaceAndDate } = commons;
  const [
    carrierModelLine,
    airplaneNameLine,
    registrationLine,
    firstFlightLine,
    placeDateLine,
    ...planeHashtagLines
  ] = descriptionLines;

  const updatedDescriptionLines: LineWord[][] = [];

  if (isCommonCarrierModel && !isCommonPlane) {
    updatedDescriptionLines.push(carrierModelLine);
  }
  if (isCommonPlane) {
    updatedDescriptionLines.push(carrierModelLine);
    updatedDescriptionLines.push(airplaneNameLine);
    updatedDescriptionLines.push(registrationLine);
    updatedDescriptionLines.push(firstFlightLine);
  }
  if (isCommonPlaceAndDate) {
    updatedDescriptionLines.push(placeDateLine);
  }
  if (isCommonPlane) {
    planeHashtagLines.forEach((line) => updatedDescriptionLines.push(line));
  }

  return updatedDescriptionLines;
};

export const getNextSelectedDescriptionLines = (
  descriptionLines: (string | false | null)[][],
  commons: Commons
) => {
  const { isCommonCarrierModel, isCommonPlane, isCommonPlaceAndDate } = commons;
  const [
    carrierModelLine,
    airplaneNameLine,
    registrationLine,
    firstFlightLine,
    placeDateLine,
    ...planeHashtagLines
  ] = descriptionLines;

  const updatedDescriptionLines: (string | false | null)[][] = [];

  if (!isCommonCarrierModel) {
    updatedDescriptionLines.push(carrierModelLine);
  }
  if (!isCommonPlane) {
    updatedDescriptionLines.push(airplaneNameLine);
    updatedDescriptionLines.push(registrationLine);
    updatedDescriptionLines.push(firstFlightLine);
  }
  if (!isCommonPlaceAndDate) {
    updatedDescriptionLines.push(placeDateLine);
  }
  if (!isCommonPlane) {
    planeHashtagLines.forEach((line) => updatedDescriptionLines.push(line));
  }

  return updatedDescriptionLines;
};

export const mergeLines = (line1: LineWord[], line2: LineWord[]): LineWord[] =>
  [...new Set([...line1, ...line2])].filter((word) => word !== '\n');

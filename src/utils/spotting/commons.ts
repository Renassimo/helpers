import { SpottedPlaneProviderData } from '@/types/spotting';

const isCommon = (
  key: keyof SpottedPlaneProviderData,
  data: SpottedPlaneProviderData[]
) => {
  const [firstDataItem, ...nextDataItems] = data;
  return nextDataItems.every(
    (dataItem) => firstDataItem[key] === dataItem[key]
  );
};

export const getCommons = (
  selectedIds: string[],
  spottingData: Record<string, SpottedPlaneProviderData>
) => {
  const data = selectedIds.map((id) => spottingData[id]);

  const isCommonManufacturer = isCommon('manufacturer', data);
  const isCommonModel = isCommon('model', data);
  const isCommonCarrier = isCommon('carrier', data);
  const isCommonRegistration = isCommon('registration', data);
  const isCommonCn = isCommon('cn', data);
  const isCommonPlace = isCommon('place', data);
  const isCommonSpottedDate = isCommon('spottedDate', data);

  const isCommonCarrierModel =
    isCommonManufacturer && isCommonModel && isCommonCarrier;
  const isCommonPlane =
    isCommonCarrierModel && isCommonRegistration && isCommonCn;
  const isCommonPlaceAndDate = isCommonPlace && isCommonSpottedDate;

  return {
    isCommonManufacturer,
    isCommonModel,
    isCommonCarrier,
    isCommonRegistration,
    isCommonCn,
    isCommonPlace,
    isCommonSpottedDate,
    isCommonCarrierModel,
    isCommonPlane,
    isCommonPlaceAndDate,
  };
};

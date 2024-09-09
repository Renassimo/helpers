import { Avia } from '@/avia/types/avia';
import MyFlightFormFieldProps from '../types';

const getFormFieldsSchema = (
  matchers: Avia.Matchers | null,
  options: Avia.Options | null
): MyFlightFormFieldProps[] => {
  const { airlines, airports, manufacturers, models } = options ?? {};
  return [
    {
      name: 'date',
      label: 'Date',
      isDate: true,
    },
    {
      name: 'flightNumber',
      label: 'Flight Number',
    },
    {
      name: 'altFlightNumber',
      label: 'Alt flight number',
    },
    {
      name: 'seatNumber',
      label: 'Seat number',
    },
    {
      name: 'airline',
      label: 'Airline',
      matchers: matchers?.airlines,
      options: airlines,
    },
    {
      name: 'altAirline',
      label: 'Alt airline',
    },
    {
      name: 'origin',
      label: 'Origin',
      matchers: matchers?.airports,
      options: airports,
    },
    {
      name: 'originName',
      label: 'Origin name',
    },
    {
      name: 'destination',
      label: 'Destination',
      matchers: matchers?.airports,
      options: airports,
    },
    {
      name: 'destinationName',
      label: 'Destination name',
    },
    {
      name: 'distance',
      label: 'Distance, km',
      type: 'number',
    },
    {
      name: 'manufacturer',
      label: 'Manufacturer',
      matchers: matchers?.manufacturers,
      options: manufacturers,
    },
    {
      name: 'model',
      label: 'Model',
      matchers: matchers?.models,
      options: models,
    },
    {
      name: 'registration',
      label: 'Registration',
    },
    {
      name: 'cn',
      label: 'CN',
    },
    {
      name: 'airplaneName',
      label: 'Airplane name',
    },
    {
      name: 'firstFlight',
      label: 'First flight',
      isDate: true,
    },
    {
      name: 'age',
      label: 'Age',
      disabled: true,
    },
    {
      name: 'planespottersUrl',
      label: 'Planespotters URL',
      type: 'url',
    },
    {
      name: 'photoUrl',
      label: 'Photo URL',
      type: 'url',
    },
  ];
};

export default getFormFieldsSchema;

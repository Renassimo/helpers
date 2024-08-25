import { FlightsDB } from '../myFlightsDb';

export const mockedFlightsDb: FlightsDB = {
  id: 'flights',
  object: 'database',
  properties: {
    Origin: {
      id: 'flight-origin',
      name: 'Origin',
      type: 'select',
      select: {
        options: [
          {
            id: 'flight-origin-1',
            name: 'Airport 1',
            color: 'default',
          },
          {
            id: 'flight-origin-2',
            name: 'Airport 2',
            color: 'yellow',
          },
        ],
      },
    },
    Destination: {
      id: 'flight-destination',
      name: 'Destination',
      type: 'select',
      select: {
        options: [
          {
            id: 'flight-destination-1',
            name: 'Airport 2',
            color: 'gray',
          },
          {
            id: 'flight-destination-2',
            name: 'Airport 3',
            color: 'blue',
          },
        ],
      },
    },
    Airline: {
      id: 'flight-airline',
      name: 'Airline',
      type: 'select',
      select: {
        options: [
          {
            id: 'flight-airline-1',
            name: 'Airline 1',
            color: 'gray',
          },
          {
            id: 'flight-airline-2',
            name: 'Airline 2',
            color: 'blue',
          },
        ],
      },
    },
    Manufacturer: {
      id: 'flight-manufacturer',
      name: 'Manufacturer',
      type: 'select',
      select: {
        options: [
          {
            id: 'flight-manufacturer-1',
            name: 'Manufacturer 1',
            color: 'gray',
          },
          {
            id: 'flight-manufacturer-2',
            name: 'Manufacturer 2',
            color: 'blue',
          },
        ],
      },
    },
    'Alt airline': {
      id: 'flight-altAirline',
      name: 'Alt airline',
      type: 'select',
      select: {
        options: [
          {
            id: 'flight-altAirline-1',
            name: 'Airline 2',
            color: 'gray',
          },
          {
            id: 'flight-altAirline-2',
            name: 'Airline 3',
            color: 'blue',
          },
        ],
      },
    },
    Model: {
      id: 'flight-model',
      name: 'Model',
      type: 'select',
      select: {
        options: [
          {
            id: 'flight-model-1',
            name: 'Model 1',
            color: 'gray',
          },
          {
            id: 'flight-model-2',
            name: 'Model 2',
            color: 'blue',
          },
        ],
      },
    },
  },
};

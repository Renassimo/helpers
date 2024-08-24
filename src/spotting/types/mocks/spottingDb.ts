import { SpottingDB } from '../spottingDb';

export const mockedSpottingDb: SpottingDB = {
  id: 'spotting',
  object: 'database',
  properties: {
    Place: {
      id: 'spotting-place',
      name: 'Place',
      type: 'select',
      select: {
        options: [
          {
            id: 'spotting-place-1',
            name: 'Airport 3',
            color: 'gray',
          },
          {
            id: 'spotting-place-2',
            name: 'Airport 4',
            color: 'blue',
          },
        ],
      },
    },
    Carrier: {
      id: 'spotting-carrier',
      name: 'Carrier',
      type: 'select',
      select: {
        options: [
          {
            id: 'spotting-carrier-1',
            name: 'Airline 3',
            color: 'gray',
          },
          {
            id: 'spotting-carrier-2',
            name: 'Airline 4',
            color: 'blue',
          },
        ],
      },
    },
    Manufacturer: {
      id: 'spotting-manufacturer',
      name: 'Manufacturer',
      type: 'select',
      select: {
        options: [
          {
            id: 'spotting-manufacturer-1',
            name: 'Manufacturer 2',
            color: 'gray',
          },
          {
            id: 'spotting-manufacturer-2',
            name: 'Manufacturer 3',
            color: 'blue',
          },
        ],
      },
    },
    Model: {
      id: 'spotting-model',
      name: 'Model',
      type: 'select',
      select: {
        options: [
          {
            id: 'spotting-model-1',
            name: 'Model 2',
            color: 'gray',
          },
          {
            id: 'spotting-model-2',
            name: 'Model 3',
            color: 'blue',
          },
        ],
      },
    },
  },
};

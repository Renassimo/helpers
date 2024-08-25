import { AeroDataBoxApi } from '../aeroDataBox';

export const mockedAircrafts: AeroDataBoxApi.Aircraft[] = [
  {
    id: 9559,
    reg: 'VP-BQX',
    active: false,
    serial: '2957',
    hexIcao: '424058',
    airlineName: 'Aeroflot',
    iataCodeShort: '321',
    icaoCode: 'A321',
    model: 'A321',
    modelCode: '321-211',
    numSeats: 170,
    rolloutDate: '2006-11-24',
    firstFlightDate: '2006-11-24',
    deliveryDate: '2006-12-06',
    registrationDate: '2006-12-06',
    typeName: 'Airbus A321',
    numEngines: 2,
    engineType: 'Jet',
    isFreighter: false,
    productionLine: 'Airbus A321',
    ageYears: 17.8,
    verified: true,
    numRegistrations: 4,
    image: {
      url: 'https://farm66.staticflickr.com/65535/49793557276_d983c0beb5_z.jpg',
      title: 'F-HHUB  ORY',
    },
  },
];

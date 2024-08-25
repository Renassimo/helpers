import { AeroDataBoxApi } from '../aeroDataBox';

export const mockedFlights: AeroDataBoxApi.Flight[] = [
  {
    greatCircleDistance: {
      meter: 4157106.32,
      km: 4157.11,
      mile: 2583.11,
      nm: 2244.66,
      feet: 13638800.27,
    },
    departure: {
      airport: {
        icao: 'OMDB',
        iata: 'DXB',
        name: 'Dubai',
        shortName: 'Dubai',
        municipalityName: 'Dubai',
        location: {
          lat: 25.252798,
          lon: 55.3644,
        },
        countryCode: 'AE',
        timeZone: 'Asia/Dubai',
      },
      scheduledTime: {
        utc: '2024-08-24 11:10Z',
        local: '2024-08-24 15:10+04:00',
      },
      terminal: '3',
      // quality: ['Basic'],
    },
    arrival: {
      airport: {
        icao: 'EPWA',
        iata: 'WAW',
        name: 'Warsaw Chopin',
        shortName: 'Chopin',
        municipalityName: 'Warsaw',
        location: {
          lat: 52.1657,
          lon: 20.9671,
        },
        countryCode: 'PL',
        timeZone: 'Europe/Warsaw',
      },
      scheduledTime: {
        utc: '2024-08-24 17:30Z',
        local: '2024-08-24 19:30+02:00',
      },
      predictedTime: {
        utc: '2024-08-24 16:42Z',
        local: '2024-08-24 18:42+02:00',
      },
      // quality: ['Basic'],
    },
    lastUpdatedUtc: '2024-08-24 14:40Z',
    number: 'FZ 1839',
    callSign: 'FDB1839',
    status: 'Unknown',
    codeshareStatus: 'IsOperator',
    isCargo: false,
    aircraft: {
      reg: 'A6-FMB',
      modeS: '8964D1',
      model: 'Boeing 737 MAX 8',
      image: {
        url: 'https://farm66.staticflickr.com/65535/51788228697_3c96482599_z.jpg',
        // webUrl: 'https://www.flickr.com/photos/186012304@N06/51788228697/',
        // author: 'Ronen Fefer',
        title: 'TLV-FlyDubai Boeing 737 MAX8 A6-FMH',
        // description: 'Departing a cloudy TLV bound for DXB',
        // license: 'AttributionShareAlikeCC',
        // htmlAttributions: [
        //   "Original of \"<span property='dc:title' itemprop='name'>TLV-FlyDubai Boeing 737 MAX8 A6-FMH</span>\" by  <a rel='dc:creator nofollow' property='cc:attributionName' href='https://www.flickr.com/photos/186012304@N06/51788228697/' target='_blank'><span itemprop='producer'>Ronen Fefer</span></a>.",
        //   'Shared and hosted by <span itemprop=\'publisher\'>Flickr</span> under <a target="_blank" rel="license cc:license nofollow" href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>',
        // ],
      },
    },
    airline: {
      name: 'flydubai',
      iata: 'FZ',
      icao: 'FDB',
    },
  },
];

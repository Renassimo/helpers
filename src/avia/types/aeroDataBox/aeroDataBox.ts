export namespace AeroDataBoxApi {
  export interface Location {
    lat: number; // 52.1657
    lon: number; // 20.9671
  }

  export interface Length {
    // Elevation and Distance
    meter: number; // 110.34
    km: number; // 0.11
    mile: number; // 0.07
    nm: number; // 0.06
    feet: number; // 362.0
  }

  export interface Time {
    utc: string; // '2024-08-21 14:27Z'
    local: string; // '2024-08-21 16:27+02:00'
  }

  export interface Image {
    url: string; // 'https://farm6.staticflickr.com/5682/31217922845_9ffa004ef9_z.jpg'
    // webUrl: string; // 'https://www.flickr.com/photos/128575832@N08/31217922845/'
    // author: string; // 'oliver.holzbauer'
    title: string; // 'VP-BWD Aeroflot - Russian Airlines Airbus A320-214 coming in from Moskau-Sheremetyevo (SVO / UUEE) @ Frankfurt - Rhein-Main International (FRA / EDDF) / 24.11.2016'
    // description: string; // 'VP-BWD Aeroflot - Russian Airlines Airbus A320-214 coming in from Moskau-Sheremetyevo (SVO / UUEE) @ Frankfurt - Rhein-Main International (FRA / EDDF) / 24.11.2016'
    // license: string; // 'AttributionShareAlikeCC'
    // htmlAttributions: string[];
  }

  interface Point {
    airport?: Airport;
    scheduledTime?: Time;
    revisedTime?: Time;
    predictedTime?: Time;
    terminal?: string; // 'C';
    checkInDesk?: string; // '222-227'; - for departures
    gate?: string; // '39'; - for departures
    baggageBelt?: string; // - for arrivals
    // quality: string[]; // ['Basic', 'Live'];
  }

  export interface AircraftShort {
    reg?: string; // 'YL-ABM';
    modeS?: string; // '502D5E'; - hex code
    model?: string; // 'Airbus A220-300';
    image?: Image;
  }

  export interface Airline {
    name?: string; // 'SWISS';
    iata: string; // 'LX';
    icao: string; // 'SWR';
  }

  namespace Airport {
    interface Basic {
      icao?: string; // 'EPWA'; 'LSZH';
      iata?: string; // 'WAW'; 'ZRH';
      shortName?: string; // 'Chopin'; 'Kloten';
      municipalityName?: string; // 'Warsaw'; 'Zurich';
      location?: Location;
      countryCode?: string; // 'PL'; 'CH';
      timeZone?: string; // 'Europe/Warsaw'; 'Europe/Zurich';
    }
    export interface WithName extends Basic {
      name?: string; // 'Warsaw Chopin'; 'Zurich Kloten';
      fullName?: never;
    }
    export interface WithFullName extends Basic {
      // retrives by IATA or ICAO code
      fullName?: string; // 'Warsaw Chopin'; 'Zurich Kloten';
      name?: never;
      // in case of error
      message: string;
    }
  }

  export type Airport = Airport.WithName;
  export type AirportExact = Airport.WithFullName;

  export interface Flight {
    greatCircleDistance?: Length;
    departure?: Point;
    arrival?: Point;
    lastUpdatedUtc?: string; // '2024-08-21 15:26Z';
    number: string; // 'LX 1353';
    callSign?: string; // 'FDB1839',
    status?: string; // 'Expected';
    codeshareStatus?: string; // 'IsOperator';
    isCargo: boolean; // false;
    aircraft?: AircraftShort;
    airline?: Airline;
  }

  export interface Aircraft {
    id: number; // 14486
    reg: string; // 'VP-BZP'
    active?: boolean; // false
    serial?: string; // '3631'
    hexIcao?: string; // '43BE88'
    airlineName?: string; // 'Aeroflot'
    iataCodeShort?: string; // '320'
    icaoCode?: string; // 'A320'
    model?: string; // 'A320'
    modelCode?: string; // '320-214'
    numSeats?: number; // 180
    rolloutDate?: string; // '2008-08-21'
    firstFlightDate?: string; // '2008-08-21'
    deliveryDate?: string; // '2008-09-02'
    registrationDate?: string; // '2008-09-02'
    typeName?: string; // 'Airbus A320'
    numEngines?: number; // 2
    engineType?: string; // 'Jet'
    isFreighter?: boolean; // false
    productionLine?: string; // 'Airbus A320'
    ageYears?: number; // 16.0
    verified?: boolean; // true
    numRegistrations?: number; // 18
    image?: Image;
  }
}

export interface AeroDataBoxHelperData {
  xRapidapiKey: string;
}

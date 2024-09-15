import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';
// import {
//   mockedAircrafts,
//   mockedAirports,
//   mockedFlights,
// } from '@/avia/types/aeroDataBox/mocks';

class AeroDataBoxService {
  apiKey!: string;
  baseURL!: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseURL = process.env.AERO_DATA_BOX_BASE_URL ?? '';
  }

  async retrieveAircrafts(
    searchQuery: string,
    searchBy: 'reg' | 'icao24' | 'id' = 'reg'
  ): Promise<AeroDataBoxApi.Aircraft[]> {
    // return [mockedAircrafts[0], mockedAircrafts[0]];
    const response = await fetch(
      `${this.baseURL}/aircrafts/${searchBy}/${searchQuery}/all`,
      {
        method: 'GET',
        headers: this.headers,
      }
    );
    return await response.json();
  }

  async retreiveAirportByCode(
    code: string,
    searchBy: 'iata' | 'icao' = 'iata'
  ): Promise<AeroDataBoxApi.AirportExact> {
    // return mockedAirports[1] as AeroDataBoxApi.AirportExact;
    const response = await fetch(
      `${this.baseURL}/airports/${searchBy}/${code}?withTime=true`,
      {
        method: 'GET',
        headers: this.headers,
      }
    );
    return await response.json();
  }

  async retreiveAirportsByText(
    searchQuery: string
  ): Promise<AeroDataBoxApi.Airport[]> {
    // return mockedAirports as AeroDataBoxApi.Airport[];
    const response = await fetch(
      `${this.baseURL}/airports/search/term?q=${searchQuery}`,
      {
        method: 'GET',
        headers: this.headers,
      }
    );
    const { items } = await response.json();
    return items;
  }

  async retreiveAirportsByLocation(
    lat: string,
    lot: string
  ): Promise<AeroDataBoxApi.Airport[]> {
    // return mockedAirports as AeroDataBoxApi.Airport[];
    const response = await fetch(
      `${this.baseURL}/airports/search/location?lat=${lat}&lon=${lot}&radiusKm=25&limit=10`,
      {
        method: 'GET',
        headers: this.headers,
      }
    );
    const { items } = await response.json();
    return items;
  }

  async retreiveFlights(
    flightNumber: string,
    date?: string
  ): Promise<AeroDataBoxApi.Flight[]> {
    // return [...mockedFlights, ...mockedFlights];
    const withDate = date ? `/${date}` : '';
    const response = await fetch(
      `${this.baseURL}/flights/number/${flightNumber}${withDate}?withAircraftImage=true`,
      {
        method: 'GET',
        headers: this.headers,
      }
    );
    return await response.json();
  }

  private get headers() {
    return {
      'Content-Type': 'application/json',
      'x-rapidapi-key': this.apiKey,
    };
  }
}

export default AeroDataBoxService;

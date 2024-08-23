import { AeroDataBoxApi } from '@/common/types/aeroDataBox';

class AeroDataBoxService {
  apiKey!: string;
  baseURL!: string;

  constructor(apiKey = '') {
    this.apiKey = apiKey;
    this.baseURL = process.env.AERO_DATA_BOX_BASE_URL ?? '';
  }

  async retrieveAircrafts(
    searchQuery: string,
    searchBy: 'reg' | 'icao24' | 'id' = 'reg'
  ): Promise<{ data: AeroDataBoxApi.Aircraft[] }> {
    const response = await fetch(
      `${this.baseURL}/aircrafts/${searchBy}/${searchQuery}/all`,
      {
        method: 'GET',
        headers: this.headers,
      }
    );
    const data = await response.json();
    return { data };
  }

  async retreiveAirportByCode(
    code: string,
    searchBy: 'iata' | 'icao' = 'iata'
  ): Promise<{ data: AeroDataBoxApi.AirportExact }> {
    const response = await fetch(
      `${this.baseURL}/airports/${searchBy}/${code}?withTime=true`,
      {
        method: 'GET',
        headers: this.headers,
      }
    );
    const data = await response.json();
    return { data };
  }

  async retreiveAirportsByText(
    searchQuery: string
  ): Promise<{ data: AeroDataBoxApi.Airport[] }> {
    const response = await fetch(
      `${this.baseURL}/airports/search/term?q=${searchQuery}`,
      {
        method: 'GET',
        headers: this.headers,
      }
    );
    const { items } = await response.json();
    return { data: items };
  }

  async retreiveAirportsByLocation(
    lat: string,
    lot: string
  ): Promise<{ data: AeroDataBoxApi.Airport[] }> {
    const response = await fetch(
      `${this.baseURL}/airports/search/location?lat=${lat}&lon=${lot}&radiusKm=25&limit=10`,
      {
        method: 'GET',
        headers: this.headers,
      }
    );
    const { items } = await response.json();
    return { data: items };
  }

  private get headers() {
    return {
      'Content-Type': 'application/json',
      'x-rapidapi-key': this.apiKey,
    };
  }
}

export default AeroDataBoxService;

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
  ) {
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

  private get headers() {
    return {
      'Content-Type': 'application/json',
      'x-rapidapi-key': this.apiKey,
    };
  }
}

export default AeroDataBoxService;

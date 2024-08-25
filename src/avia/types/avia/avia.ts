import { Data } from '@/common/types/props';

export namespace Avia {
  export interface FlightAttributes {
    flightNumber: string;
    origin: string;
    originName: string;
    destination: string;
    destinationName: string;
    distance: number;
    date: string;
    airline: string | null;
    aircraft: string | null;
    registration: string | null;
    photoUrl: string | null;
  }

  export type FlightData = Data<FlightAttributes>;
}

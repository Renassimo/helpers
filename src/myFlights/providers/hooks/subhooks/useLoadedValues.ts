import { useCallback, useMemo } from 'react';

import {
  MyFlightAttributes,
  UseAircraftsResult,
  UseAirportsResult,
  UseFlightsResult,
} from '@/myFlights/types';

import { showTimePassed } from '@/common/utils/dayjs';
import geoDistance from '@/common/lib/geoDistance';

const useLoadedValues = ({
  flightsResult,
  aircraftsResult,
  originsResult,
  destinationsResult,
}: {
  flightsResult: UseFlightsResult;
  aircraftsResult: UseAircraftsResult;
  originsResult: UseAirportsResult;
  destinationsResult: UseAirportsResult;
}): {
  loadedValues: Partial<MyFlightAttributes>;
  cleanUp: () => void;
} => {
  // Flights
  const { chosenFlight, cleanUpFlights } = flightsResult;

  // Aircrafs
  const { chosenAircraft, cleanUpAircrafts } = aircraftsResult;

  // Airports
  // Origin
  const { chosenAirport: chosenOrigin, cleanUpAirports: cleanUpOrigins } =
    originsResult;
  // Destination
  const {
    chosenAirport: chosenDestination,
    cleanUpAirports: cleanUpDestinations,
  } = destinationsResult;

  const loadedValues: Partial<MyFlightAttributes> = useMemo(() => {
    const registration =
      chosenAircraft?.attributes.registration ??
      chosenFlight?.attributes.registration ??
      null;

    const firstFlight =
      chosenAircraft?.attributes.firstFlightDate ??
      chosenAircraft?.attributes.rolloutDate ??
      chosenAircraft?.attributes.deliveryDate ??
      null;

    const originLocation =
      chosenOrigin?.attributes.location ??
      chosenFlight?.attributes.originLocation;
    const destinationLocation =
      chosenDestination?.attributes.location ??
      chosenFlight?.attributes.destinationLocation;
    const distancePossible = originLocation && destinationLocation;

    return {
      title: null,
      date: chosenFlight?.attributes.date ?? null,
      airline:
        chosenAircraft?.attributes.airlineName ??
        chosenFlight?.attributes.airline ??
        null,
      flightNumber: chosenFlight?.attributes.flightNumber ?? null,
      origin:
        chosenOrigin?.attributes.airportCode ??
        chosenFlight?.attributes.origin ??
        null,
      destination:
        chosenDestination?.attributes.airportCode ??
        chosenFlight?.attributes.destination ??
        null,
      manufacturer:
        chosenAircraft?.attributes.typeName ??
        chosenAircraft?.attributes.productionLine ??
        null,
      model:
        chosenAircraft?.attributes.modelCode ??
        chosenAircraft?.attributes.model ??
        null,
      registration,
      cn: chosenAircraft?.attributes.serial ?? null,
      firstFlight,
      airplaneName: null,
      originName:
        chosenOrigin?.attributes.airportName ??
        chosenFlight?.attributes.originName ??
        null,
      destinationName:
        chosenDestination?.attributes.airportName ??
        chosenFlight?.attributes.destinationName ??
        null,
      seatNumber: null,
      altAirline: null,
      altFlightNumber: null,
      planespottersUrl: registration
        ? `https://www.planespotters.net/search?q=${registration}`
        : null,
      distance:
        chosenFlight?.attributes.distance ??
        (distancePossible &&
          geoDistance(originLocation, destinationLocation)) ??
        null,
      age: firstFlight ? showTimePassed(firstFlight) : null,
      photoUrl:
        chosenAircraft?.attributes.photoUrl ??
        chosenFlight?.attributes.photoUrl ??
        null,
    };
  }, [chosenAircraft, chosenDestination, chosenOrigin, chosenFlight]);

  const cleanUp = useCallback(() => {
    cleanUpFlights();
    cleanUpAircrafts();
    cleanUpOrigins();
    cleanUpDestinations();
  }, []);

  return { loadedValues, cleanUp };
};

export default useLoadedValues;

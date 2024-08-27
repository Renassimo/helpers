import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { showWhen } from '@/common/utils/dayjs';

import { MyFlightData } from '@/myFlights/types';

import useThemeBreakpoints from '@/common/hooks/useThemeBreakpoints';

import MyFlightCardActions from '@/myFlights/components/MyFlightCardActions';

const FlightCard = ({ data }: { data: MyFlightData }) => {
  const { attributes } = data;
  const {
    photoUrl,
    flightNumber,
    seatNumber,
    originName,
    destinationName,
    cn,
    firstFlight,
    age,
    distance,
    registration,
    airplaneName,
  } = attributes;

  const {
    down: { sm: sDensed },
  } = useThemeBreakpoints();

  const valuesSchema: [string, string | number | null][] = [
    ['Origin', originName],
    ['Destination', destinationName],
    ['Flight number', flightNumber],
    ['Distance, km', distance],
    ['Seat number', seatNumber],
    ['Airplane name', airplaneName],
    ['First flight', firstFlight ? showWhen(firstFlight, false) : null],
    ['Age at the flight', age],
    ['Registration', sDensed ? registration : null],
    ['Serial', cn],
  ];

  const getAttribute = (title: string, value: string | number | null) =>
    value ? (
      <Grid item xs={12} md={6} key={title + value}>
        <Typography variant="subtitle2">{title}: </Typography>
        <Typography variant="body2">{value}</Typography>
      </Grid>
    ) : null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5}>
        {<img src={photoUrl ?? '/images/plane.png'} width="100%" />}
      </Grid>
      <Grid item container xs={12} md={6} spacing={2}>
        {valuesSchema.map(([title, value]) => getAttribute(title, value))}
      </Grid>
      <Grid item xs={12} md={1}>
        <MyFlightCardActions data={data} />
      </Grid>
    </Grid>
  );
};

export default FlightCard;

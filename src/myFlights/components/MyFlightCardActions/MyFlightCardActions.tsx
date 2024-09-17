import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditInNewIcon from '@mui/icons-material/Edit';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import useThemeBreakpoints from '@/common/hooks/useThemeBreakpoints';
import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import { MyFlightData } from '@/myFlights/types';

const MyFlightCardActions = ({ data }: { data: MyFlightData }) => {
  const {
    down: { md: densed },
  } = useThemeBreakpoints();

  const {
    myFlightForm: { openModal },
  } = useMyFlightsContext();

  const { attributes } = data;
  const { planespottersUrl, registration, url } = attributes;

  const searchLink =
    planespottersUrl ??
    (registration &&
      `https://www.planespotters.net/search?q=${registration}`) ??
    '';

  return (
    <Grid container direction={densed ? 'row' : 'column'}>
      <Grid item>
        <IconButton aria-label="Edit" onClick={() => openModal(data)}>
          {<EditInNewIcon />}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          aria-label="Add Return Flight"
          onClick={() => openModal(data, true)}
        >
          {<SwapHorizIcon />}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          aria-label="Open in Notion"
          LinkComponent={'a'}
          href={url}
          target="_blank"
        >
          {<OpenInNewIcon />}
        </IconButton>
      </Grid>
      {searchLink && (
        <Grid item>
          <IconButton
            aria-label="Search in Planespotters"
            LinkComponent={'a'}
            href={searchLink}
            target="_blank"
          >
            {<SearchIcon />}
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default MyFlightCardActions;

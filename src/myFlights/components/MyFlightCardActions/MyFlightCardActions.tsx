import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditInNewIcon from '@mui/icons-material/Edit';

import useThemeBreakpoints from '@/common/hooks/useThemeBreakpoints';

import { MyFlightData } from '@/myFlights/types';

const MyFlightCardActions = ({ data }: { data: MyFlightData }) => {
  const {
    down: { md: densed },
  } = useThemeBreakpoints();

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
        <IconButton aria-label="Edit" onClick={() => console.log('Edit')}>
          {<EditInNewIcon />}
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

import Link from 'next/link';

import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';

const LocaleLinks = ({
  locale,
  locales,
  href,
}: {
  locale: string;
  locales: string[];
  href: string;
}) => {
  const otherLocales = locales.filter((lcl) => lcl !== locale);

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      {otherLocales.map((lcl) => (
        <Box key={lcl} px={2}>
          <Link href={href} locale={lcl}>
            <MuiLink component="span">{lcl}</MuiLink>
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default LocaleLinks;

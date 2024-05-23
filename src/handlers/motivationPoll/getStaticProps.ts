import { GetStaticPropsContext } from 'next';

import { getDataForApi } from '@/utils/motivationPoll/dataHandler';
import {
  isMotivationPollLocale,
  MotivationPollLocale,
} from '@/types/motivationPoll';

const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { locale: currentLocale, defaultLocale, locales } = ctx;
  const locale: MotivationPollLocale = isMotivationPollLocale(currentLocale)
    ? currentLocale
    : (defaultLocale as 'en');

  return { props: { data: getDataForApi(locale), locales, locale } };
};

export default getStaticProps;

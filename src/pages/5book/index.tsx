import { getDayCode } from '@/utils/dayjs';

const FiveBook = () => <></>;

export const getServerSideProps = async () => ({
  redirect: {
    permanent: false,
    destination: `/5book/${getDayCode()}`,
  },
});

export default FiveBook;

const GameMaps = () => <></>;

export const getServerSideProps = async () => ({
  redirect: {
    permanent: false,
    destination: '/gameMaps/games',
  },
});

export default GameMaps;

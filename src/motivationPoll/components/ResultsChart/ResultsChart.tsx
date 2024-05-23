import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import Box from '@mui/material/Box';

const ResultsChart = () => {
  const { results, name } = useMotivationPoll();

  return (
    <Box minWidth="300px" width="100%" height="800px">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={results ?? []}>
          <PolarGrid />
          <PolarAngleAxis dataKey="text" />
          <PolarRadiusAxis />
          <Radar
            name={name ?? 'You'}
            dataKey="points"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.7}
          />
          <Radar
            name="Median"
            dataKey="medianValue"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.1}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ResultsChart;

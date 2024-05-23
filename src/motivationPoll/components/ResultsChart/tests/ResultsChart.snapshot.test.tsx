import renderWithTheme from '@/tests/helpers/renderWithTheme';

import useMotivationPoll from '@/motivationPoll/hooks/useMotivationPoll';

import { mockedresults } from '@/types/motivationPoll/mocks';

import ResultsChart from '../ResultsChart';
import { ReactNode } from 'react';
import { DemandData } from '@/types/motivationPoll';

jest.mock('@/motivationPoll/hooks/useMotivationPoll');
jest.mock('recharts', () => ({
  RadarChart: ({
    children,
    cx,
    cy,
    outerRadius,
    data,
  }: {
    children: ReactNode;
    cx: string;
    cy: string;
    outerRadius: string;
    data: DemandData[];
  }) => (
    <div>
      RadarChart {cx}
      {cy}
      {outerRadius}
      <>{children}</>
      {JSON.stringify(data)}
    </div>
  ),
  ResponsiveContainer: ({
    children,
    width,
    height,
  }: {
    children: ReactNode;
    width: string;
    height: string;
  }) => (
    <div>
      ResponsiveContainer {width}
      {height}
      <>{children}</>
    </div>
  ),
  PolarGrid: () => <div>PolarGrid</div>,
  PolarAngleAxis: ({ dataKey }: { dataKey: string }) => (
    <div>PolarAngleAxis{dataKey}</div>
  ),
  PolarRadiusAxis: () => <div>PolarRadiusAxis</div>,
  Radar: ({
    name,
    dataKey,
    stroke,
    fill,
    fillOpacity,
  }: {
    name: string;
    dataKey: string;
    stroke: string;
    fill: string;
    fillOpacity: number;
  }) => (
    <div>
      Radar{name}
      {dataKey}
      {stroke}
      {fill}
      {fillOpacity}
    </div>
  ),
  Legend: () => <div>Legend</div>,
}));

describe('ResultsChart snapshot', () => {
  const mockedName = 'Mocked Name';

  beforeEach(() => {
    (useMotivationPoll as jest.Mock).mockImplementation(() => ({
      results: mockedresults,
      name: mockedName,
    }));
  });

  test('Renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<ResultsChart />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});

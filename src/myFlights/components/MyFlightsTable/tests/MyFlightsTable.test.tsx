import renderWithTheme from '@/common/tests/helpers/renderWithTheme';
import userEvent from '@testing-library/user-event';

import { showWhen } from '@/common/utils/dayjs';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';
import useFilter from '@/common/hooks/useFilter';
import useTableOrder from '@/common/hooks/useTableOrder';
import useTablePagination from '@/common/hooks/useTablePagination';
import useTableCollapse from '@/common/hooks/useTableCollapse';
import useThemeBreakpoints from '@/common/hooks/useThemeBreakpoints';

import FilterInput from '@/common/components/FilterInput';
import MyFlightCard from '@/myFlights/components/MyFlightCard';

import MockedFilterInput from '@/common/components/FilterInput/mocks';
import MockedMyFlightCard from '@/myFlights/components/MyFlightCard/mocks';

import {
  mockedMyFlight1,
  mockedMyFlight2,
  mockedMyFlight3,
  mockedMyFlightsList,
} from '@/myFlights/types/mocks';

import MyFlightsTable from '../MyFlightsTable';

jest.mock('@/common/utils/dayjs');
jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');
jest.mock('@/common/hooks/useFilter');
jest.mock('@/common/hooks/useTableOrder');
jest.mock('@/common/hooks/useTablePagination');
jest.mock('@/common/hooks/useTableCollapse');
jest.mock('@/common/hooks/useThemeBreakpoints');
jest.mock('@/common/components/FilterInput');
jest.mock('@/myFlights/components/MyFlightCard');

describe('MyFlightsTable', () => {
  const mockedShowWhen = jest.fn((arg) => arg);

  const mockedUseMyFlightsContext = jest.fn(() => ({
    myFlightsList: mockedMyFlightsList,
  }));

  const mockedSetFilterQuery = jest.fn();
  const mockedUseFilterResult = {
    filterQuery: '',
    setFilterQuery: mockedSetFilterQuery,
    visibleItems: mockedMyFlightsList,
  };
  const mockedUseFilter = jest.fn(() => mockedUseFilterResult);

  const mockedReverse = jest.fn();
  const mockedUseTableOrderResult = {
    orderedList: mockedMyFlightsList,
    isReversedOrder: false,
    reverse: mockedReverse,
  };
  const mockedUseTableOrder = jest.fn(() => mockedUseTableOrderResult);

  const mockedOnPageChange = jest.fn();
  const mockedOnRowsPerPageChange = jest.fn();
  const mockedPaginationProps = {
    rowsPerPageOptions: [10, 20],
    component: 'div',
    count: 100,
    rowsPerPage: 10,
    page: 0,
    onPageChange: mockedOnPageChange,
    onRowsPerPageChange: mockedOnRowsPerPageChange,
  };
  const mockedUseTablePaginationResult = {
    paginationProps: mockedPaginationProps,
    rows: mockedMyFlightsList,
  };
  const mockedUseTablePagination = jest.fn(
    () => mockedUseTablePaginationResult
  );

  const mockedToggleOpenRowId = jest.fn();
  const mockedUseTableCollapse = jest.fn(() => [null, mockedToggleOpenRowId]);

  const mockedBreakpoints = {
    down: { sm: false, md: false },
  };
  const mockedUseThemeBreakpoints = jest.fn(() => mockedBreakpoints);

  beforeEach(() => {
    (showWhen as unknown as jest.Mock).mockImplementation(mockedShowWhen);
    (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
      mockedUseMyFlightsContext
    );
    (useFilter as unknown as jest.Mock).mockImplementation(mockedUseFilter);
    (useTableOrder as unknown as jest.Mock).mockImplementation(
      mockedUseTableOrder
    );
    (useTablePagination as unknown as jest.Mock).mockImplementation(
      mockedUseTablePagination
    );
    (useTableCollapse as unknown as jest.Mock).mockImplementation(
      mockedUseTableCollapse
    );
    (useThemeBreakpoints as unknown as jest.Mock).mockImplementation(
      mockedUseThemeBreakpoints
    );
    (FilterInput as unknown as jest.Mock).mockImplementation(MockedFilterInput);
    (MyFlightCard as unknown as jest.Mock).mockImplementation(
      MockedMyFlightCard
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<MyFlightsTable />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(useMyFlightsContext).toBeCalledWith();
    expect(useFilter).toBeCalledWith(mockedMyFlightsList, [
      'airline',
      'manufacturer',
      'model',
      'registration',
      'origin',
      'destination',
      'originName',
      'destinationName',
      'airplaneName',
    ]);
    expect(useTableOrder).toBeCalledWith(mockedMyFlightsList, false);
    expect(useTablePagination).toBeCalledWith(mockedMyFlightsList, [
      10,
      25,
      50,
      100,
      mockedMyFlightsList.length,
    ]);
    expect(useTableCollapse).toBeCalledWith();
    expect(useThemeBreakpoints).toBeCalledWith();
    expect(FilterInput).toBeCalledWith(
      { value: '', setValue: expect.any(Function), fullWidth: true },
      {}
    );
    expect(MyFlightCard).toBeCalledTimes(3);
    expect(MyFlightCard).nthCalledWith(1, { data: mockedMyFlight1 }, {});
    expect(MyFlightCard).nthCalledWith(2, { data: mockedMyFlight2 }, {});
    expect(MyFlightCard).nthCalledWith(3, { data: mockedMyFlight3 }, {});
  });

  describe('when table hook results changed', () => {
    const mockedFilterQuery = 'filter-query';
    const mockedUseFilter = jest.fn(() => ({
      ...mockedUseFilterResult,
      filterQuery: mockedFilterQuery,
    }));

    const mockedUseTableOrder = jest.fn(() => ({
      ...mockedUseTableOrderResult,
      isReversedOrder: false,
    }));

    const mockedUseTablePagination = jest.fn(() => ({
      ...mockedUseTablePaginationResult,
      paginationProps: {
        ...mockedPaginationProps,
        rowsPerPage: 20,
        page: 1,
      },
    }));

    const mockedUseTableCollapse = jest.fn(() => [
      mockedMyFlight2.id,
      mockedToggleOpenRowId,
    ]);

    beforeEach(() => {
      (useFilter as unknown as jest.Mock).mockImplementation(mockedUseFilter);
      (useTableOrder as unknown as jest.Mock).mockImplementation(
        mockedUseTableOrder
      );
      (useTablePagination as unknown as jest.Mock).mockImplementation(
        mockedUseTablePagination
      );
      (useTableCollapse as unknown as jest.Mock).mockImplementation(
        mockedUseTableCollapse
      );
    });

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<MyFlightsTable />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(useMyFlightsContext).toBeCalledWith();
      expect(useFilter).toBeCalledWith(mockedMyFlightsList, [
        'airline',
        'manufacturer',
        'model',
        'registration',
        'origin',
        'destination',
        'originName',
        'destinationName',
        'airplaneName',
      ]);
      expect(useTableOrder).toBeCalledWith(mockedMyFlightsList, false);
      expect(useTablePagination).toBeCalledWith(mockedMyFlightsList, [
        10,
        25,
        50,
        100,
        mockedMyFlightsList.length,
      ]);
      expect(useTableCollapse).toBeCalledWith();
      expect(useThemeBreakpoints).toBeCalledWith();
      expect(FilterInput).toBeCalledWith(
        {
          value: mockedFilterQuery,
          setValue: expect.any(Function),
          fullWidth: true,
        },
        {}
      );
      expect(MyFlightCard).toBeCalledTimes(3);
      expect(MyFlightCard).nthCalledWith(1, { data: mockedMyFlight1 }, {});
      expect(MyFlightCard).nthCalledWith(2, { data: mockedMyFlight2 }, {});
      expect(MyFlightCard).nthCalledWith(3, { data: mockedMyFlight3 }, {});
    });
  });

  describe('when screen is lower than md breakpoint', () => {
    test('renders successfully', () => {
      // Arange
      const mockedBreakpoints = {
        down: { sm: false, md: true },
      };
      const mockedUseThemeBreakpoints = jest.fn(() => mockedBreakpoints);
      (useThemeBreakpoints as unknown as jest.Mock).mockImplementation(
        mockedUseThemeBreakpoints
      );
      // Act
      const { baseElement } = renderWithTheme(<MyFlightsTable />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('and lower than sm breakpoint', () => {
      test('renders successfully', () => {
        // Arange
        const mockedBreakpoints = {
          down: { sm: true, md: true },
        };
        const mockedUseThemeBreakpoints = jest.fn(() => mockedBreakpoints);
        (useThemeBreakpoints as unknown as jest.Mock).mockImplementation(
          mockedUseThemeBreakpoints
        );
        // Act
        const { baseElement } = renderWithTheme(<MyFlightsTable />);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });
    });
  });

  describe('When clicks to reverse', () => {
    test('renders successfully', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(<MyFlightsTable />);
      // Act
      await userEvent.click(getByLabelText('Reverse'));
      // Assert
      expect(mockedReverse).toHaveBeenCalled();
    });
  });

  describe('When clicks to collapse', () => {
    test('renders successfully', async () => {
      // Arange
      const { getByText } = renderWithTheme(<MyFlightsTable />);
      // Act
      await userEvent.click(getByText(mockedMyFlight3.attributes.date!));
      // Assert
      expect(mockedToggleOpenRowId).toHaveBeenCalledWith(mockedMyFlight3.id);
    });
  });
});

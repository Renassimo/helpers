import { renderHook } from '@testing-library/react';

import { getChangedAnswers } from '@/fiveBook/utils';

import useUpdateAnswers from '@/fiveBook/hooks/useUpdateAnswers';
import useFiveBook from '@/fiveBook/hooks/useFiveBook';
import useUpdateDay from '@/fiveBook/hooks/useUpdateDay';

jest.mock('@/fiveBook/hooks/useUpdateDay');
jest.mock('@/fiveBook/hooks/useFiveBook');
jest.mock('@/fiveBook/utils');

describe('useUpdateAnswers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('updates answers', async () => {
    // Arrange
    const expectedData = { data: 'response' };
    const dayCode = '303';
    const answers = { '2022': 'Wsup?' };
    const id = 'ID';
    const updateDay = jest.fn(() => expectedData);
    const setData = jest.fn();
    const payload = { id };
    const changedAnswers = { id, answers: {} };

    (useFiveBook as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => ({ setData, dayCode, answers, id }))
    );
    (useUpdateDay as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => ({ update: updateDay }))
    );
    (getChangedAnswers as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => changedAnswers)
    );

    const {
      result: { current },
    } = renderHook(() => useUpdateAnswers());
    const { update } = current;
    // Act
    await update(payload);
    // Assert
    expect(setData).toHaveBeenCalledWith(expectedData.data);
    expect(updateDay).toHaveBeenCalledWith(dayCode, {
      data: {
        id,
        attributes: {
          answers: changedAnswers,
        },
      },
    });
    expect(getChangedAnswers).toHaveBeenCalledWith(answers, payload, true);
    expect(useUpdateDay).toHaveBeenCalledWith();
    expect(useFiveBook).toHaveBeenCalledWith();
  });

  describe('when got no changed answers', () => {
    test('throws error', async () => {
      // Arrange
      const expectedData = { data: 'response' };
      const dayCode = '303';
      const answers = { '2022': 'Wsup?' };
      const id = 'ID';
      const updateDay = jest.fn(() => expectedData);
      const setData = jest.fn();
      const payload = { id };
      const changedAnswers = null;

      (useFiveBook as unknown as jest.Mock).mockImplementationOnce(
        jest.fn(() => ({ setData, dayCode, answers, id }))
      );
      (useUpdateDay as unknown as jest.Mock).mockImplementationOnce(
        jest.fn(() => ({ update: updateDay }))
      );
      (getChangedAnswers as unknown as jest.Mock).mockImplementationOnce(
        jest.fn(() => changedAnswers)
      );
      // Act
      const {
        result: { current },
      } = renderHook(() => useUpdateAnswers());
      const { update } = current;
      // Assert
      await expect(async () => {
        await update(payload);
      }).rejects.toThrow(new Error('No changes'));
      expect(updateDay).not.toHaveBeenCalled();
      expect(setData).not.toHaveBeenCalled();
      expect(useUpdateDay).toHaveBeenCalledWith();
      expect(useFiveBook).toHaveBeenCalledWith();
    });
  });
});
